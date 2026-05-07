import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IParcelMovementRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelMovementRepository";
import { IParcelRouteLegRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteLegRepository";
import { IParcelRouteRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteRepository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IBookingRepository } from "@/Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { ITransactionRepository } from "@/Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { IWalletRepository } from "@/Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { IHubShipmentAssignmentService } from "@/Application/interfaces/services_Interfaces/IHubShipmentAssignmentService";
import { ICreateHubShipmentOutForDeliveryUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/HubShipment/ICreateHubShipmentOutForDeliveryUsecase";
import { IBulkUpdateShipmentParcelUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IBulkUpdateShipmentParcelUsecase";
import { ParcelMovementMapper } from "@/Application/Mappers/Logistics/ParcelMovementMapper";
import { TransactionMapper } from "@/Application/Mappers/Wallet/transactionMapper";
import { Booking } from "@/Domain/Entities/Booking/Booking";
import { ShipmentParcelStatus } from "@/Domain/Entities/Logistics/ShipmentParcel";
import { Role } from "@/Domain/Enums/Roles";
import { AppError } from "@/Domain/utils/customError";
import { BOOKING_MESSAGE } from "@/Infrastructure/constants/messages/bookingMessages";
import { SHIPMENT_PARCEL_MESSAGE } from "@/Infrastructure/constants/messages/RouteGroupMessage";
import { WALLET_MESSAGES } from "@/Infrastructure/constants/messages/walletMessages";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { BookingStatusType } from "@/Infrastructure/Types/types";
import mongoose from "mongoose";
import { inject, injectable } from "tsyringe";

const PARCEL_FLOW: Record<ShipmentParcelStatus, ShipmentParcelStatus> = {
    PENDING: "LOADED",
    LOADED: "IN_TRANSIT",
    IN_TRANSIT: "UNLOADED",
    UNLOADED: "UNLOADED",
};

@injectable()
export class BulkUpdateShipmentParcelUsecase implements IBulkUpdateShipmentParcelUsecase {
    constructor(
        @inject("IShipmentParcelRepository") private _shipmentParcelRepo: IShipmentParcelRepository,
        @inject("IHubShipmentRepository") private _hubShipmentRepo: IHubShipmentRepository,
        @inject("IParcelRouteRepository") private _routeRepo: IParcelRouteRepository,
        @inject("IParcelRouteLegRepository") private _routeLegRepo: IParcelRouteLegRepository,
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
        @inject("IParcelMovementRepository") private _parcelMovementRepository: IParcelMovementRepository,

        @inject("ICreateHubShipmentOutForDeliveryUsecase") private _createHubShipmentOutForDeliveryUsecase: ICreateHubShipmentOutForDeliveryUsecase,
        @inject("IHubShipmentAssignmentService") private _hubShipmentAssignmentService: IHubShipmentAssignmentService,

        @inject("IWalletRepository") private readonly _walletRepo: IWalletRepository,
        @inject("ITransactionRepository") private readonly _transactionRepo: ITransactionRepository,

    ) { };

    async execute(shipmentId: string, parcelIds: string[], status: ShipmentParcelStatus): Promise<void> {

        const session = await mongoose.startSession();

        try {
            await session.withTransaction(async () => {

                const shipment = await this._hubShipmentRepo.findById({ _id: shipmentId }, session);
                if (!shipment) throw new AppError(WORKER_MESSAGES.SHIPMENT_NOT_FOUND, STATUS.NOT_FOUND);

                const parcels = await this._shipmentParcelRepo.findByIds(parcelIds, session);
                if (!parcels.length) throw new AppError(SHIPMENT_PARCEL_MESSAGE.NOTFOUND, STATUS.NOT_FOUND);

                const invalidParcels = parcels.filter(p => p.shipmentId !== shipmentId);

                if (invalidParcels.length > 0) {
                    throw new AppError(SHIPMENT_PARCEL_MESSAGE.INVALID_PARCELS, STATUS.BAD_REQUEST);
                }

                const invalidFlow = parcels.filter(p => {
                    const allowedNext = PARCEL_FLOW[p.status];
                    return allowedNext !== status;
                });

                if (invalidFlow.length > 0) throw new AppError(SHIPMENT_PARCEL_MESSAGE.INVALID_FLOW, STATUS.BAD_REQUEST);


                /* ---------------- BULK UPDATE ---------------- */
                await this._shipmentParcelRepo.bulkUpdateStatus(parcelIds, status, session);

                for (const parcel of parcels) {

                    /* -------- UPDATE BOOKING -------- */
                    let bookingStatus: BookingStatusType | null = null;

                    if (status === "LOADED") bookingStatus = "PICKUP_STARTED";

                    if (status === "IN_TRANSIT") bookingStatus = "IN_TRANSIT";

                    if (status === "UNLOADED") {

                        if (shipment.type === "OUT_FOR_DELIVERY") bookingStatus = "DELIVERED";
                        else if (shipment.type === "HUB_TRANSFER") bookingStatus = "IN_TRANSIT";
                        else if (shipment.type === "BULK_PICKUP") bookingStatus = "IN_TRANSIT";
                    }

                    if (bookingStatus) {
                        await this._bookingRepo.updateStatus(parcel.bookingId, bookingStatus, session);
                        if (shipment.type === "OUT_FOR_DELIVERY" && bookingStatus == "DELIVERED") {

                            const booking = await this._bookingRepo.getBookingById(parcel.bookingId)

                            if (!booking.partnerSnapshot?.partnerId) {
                                throw new AppError(BOOKING_MESSAGE.PARTNER_ID_MISSING, STATUS.NOT_FOUND)
                            }

                            await this.handleSettlement(booking, booking.partnerSnapshot?.partnerId)
                        }
                    }

                    /* -------- PARCELMOVEMENT UPDATE ------- */

                    let movement = null;

                    if (status === "LOADED") {
                        movement = ParcelMovementMapper.toLoaded(
                            parcel.bookingId,
                            shipment.id!,
                            shipment.fromHubId
                        );
                    }

                    if (status === "IN_TRANSIT") {
                        movement = ParcelMovementMapper.toTransit(
                            parcel.bookingId,
                            shipment.id!,
                            shipment.fromHubId,
                            shipment.toHubId
                        );
                    }

                    if (status === "UNLOADED") {

                        if (shipment.type === "OUT_FOR_DELIVERY") {
                            movement = ParcelMovementMapper.toDelivered(
                                parcel.bookingId,
                                shipment.id!,
                                shipment.toHubId
                            );
                        }

                        else {
                            movement = ParcelMovementMapper.toArrived(
                                parcel.bookingId,
                                shipment.id!,
                                shipment.toHubId
                            );
                        }
                    }

                    if (movement) {
                        await this._parcelMovementRepository.save(movement, session);
                    }




                    /* -------- UPDATE LEG & ROUTE -------- */

                    const route = await this._routeRepo.findByBookingId(parcel.bookingId, session);
                    if (!route) continue;

                    const legs = await this._routeLegRepo.findByRouteId(route.id!, session);
                    const sortedLegs = legs.sort((a, b) => a.legOrder - b.legOrder);

                    const currentLeg =
                        sortedLegs.find(l => l.status === "IN_PROGRESS") ||
                        sortedLegs.find(l => l.status === "PENDING");

                    if (!currentLeg) continue;

                    /* -------- UPDATE LEG -------- */
                    if (status === "LOADED" && shipment.type == "HUB_TRANSFER") {
                        currentLeg.status = "IN_PROGRESS";
                        currentLeg.shipmentId = shipmentId;

                        await this._routeLegRepo.update(currentLeg, session);
                    };

                    if (status === "UNLOADED") {


                        /* ---------------- BULK PICKUP → START FIRST LEG ---------------- */
                        if (shipment.type === "BULK_PICKUP") {

                            const firstLeg = sortedLegs.find(l => l.legOrder === 1);

                            if (firstLeg && firstLeg.status === "PENDING") {
                                await this._routeLegRepo.update(firstLeg, session);


                                await this._hubShipmentAssignmentService.assignLegToShipment(
                                    firstLeg,
                                    parcel.bookingId,
                                    session
                                );
                            }

                        }

                        /* ---------------- HUB TRANSFER → NEXT LEG ---------------- */
                        else if (shipment.type === "HUB_TRANSFER") {


                            currentLeg.status = "COMPLETED";
                            await this._routeLegRepo.update(currentLeg, session);


                            const nextLeg = sortedLegs.find(
                                l => l.legOrder === currentLeg.legOrder + 1
                            );

                            if (nextLeg) {
                                nextLeg.shipmentId = shipmentId

                                await this._routeLegRepo.update(nextLeg, session);

                                await this._hubShipmentAssignmentService.assignLegToShipment(
                                    nextLeg,
                                    parcel.bookingId,
                                    session
                                );
                            } else if (!nextLeg) {
                                await this._createHubShipmentOutForDeliveryUsecase.execute(parcel.bookingId)
                            }
                        }
                    }

                    /* -------- UPDATE ROUTE -------- */
                    const allCompleted = sortedLegs.every(l => l.status === "COMPLETED");
                    const anyInProgress = sortedLegs.some(l => l.status === "IN_PROGRESS");

                    if (allCompleted) {
                        route.status = "COMPLETED";
                    } else if (anyInProgress) {
                        route.status = "IN_PROGRESS";
                    }

                    route.updatedAt = new Date();
                    await this._routeRepo.update(route, session);
                }

            });

        } finally {
            await session.endSession();
        }


    }

    private async handleSettlement(booking: Booking, userId: string) {
        const session = await mongoose.startSession();


        try {
            session.startTransaction();

            const agencyWallet = await this._walletRepo.findByOwner(Role.AGENCY, userId);
            if (!agencyWallet) throw new AppError(WALLET_MESSAGES.WALLET_NOT_FOUND, STATUS.NOT_FOUND)

            const adminWallet = await this._walletRepo.getAdminWallet();
            if (!adminWallet) throw new AppError("Admin wallet not found");

            const totalAmount = booking.pricing.totalAmount;
            const commission = booking.pricing.platformFee;
            const agencyAmount = totalAmount - commission;

            // Step 1: release FULL amount from admin hold
            if (adminWallet.lockedBalance < totalAmount) {
                throw new AppError("Admin locked balance insufficient");
            };
            adminWallet.release(totalAmount);
            const adminReleaseTx = TransactionMapper.createRelease(
                adminWallet.id!,
                totalAmount,
                adminWallet.balance,
                { bookingId: booking.id }
            );

            //  Step 2: admin keeps commission
            adminWallet.debit(agencyAmount);
            const adminDebitTx = TransactionMapper.createDebit(
                adminWallet.id!,
                agencyAmount,
                "SETTLEMENT",
                adminWallet.balance,
                { bookingId: booking.id }
            );

            // Step 3: pay traveler
            agencyWallet.credit(agencyAmount);
            const travelerCreditTx = TransactionMapper.createCredit(
                agencyWallet.id!,
                agencyAmount,
                "SETTLEMENT",
                agencyWallet.balance,
                { bookingId: booking.id }
            );

            // Save both
            await this._walletRepo.update(agencyWallet, session);
            await this._walletRepo.update(adminWallet, session);

            await this._transactionRepo.create(adminReleaseTx, session);
            await this._transactionRepo.create(adminDebitTx, session);
            await this._transactionRepo.create(travelerCreditTx, session);

            await session.commitTransaction();


        } catch (err) {
            await session.abortTransaction();
            throw err;
        } finally {
            session.endSession();
        }
    }
}