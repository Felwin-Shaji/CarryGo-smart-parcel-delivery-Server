import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IParcelMovementRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelMovementRepository";
import { IParcelRouteLegRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteLegRepository";
import { IParcelRouteRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteRepository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IBookingRepository } from "@/Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IHubShipmentAssignmentService } from "@/Application/interfaces/services_Interfaces/IHubShipmentAssignmentService";
import { ICreateHubShipmentOutForDeliveryUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/HubShipment/ICreateHubShipmentOutForDeliveryUsecase";
import { IBulkUpdateShipmentParcelUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IBulkUpdateShipmentParcelUsecase";
import { ParcelRouteLeg } from "@/Domain/Entities/Logistics/ParcelRouteLeg";
import { ShipmentParcelStatus } from "@/Domain/Entities/Logistics/ShipmentParcel";
import { AppError } from "@/Domain/utils/customError";
import { SHIPMENT_PARCEL_MESSAGE } from "@/Infrastructure/constants/messages/RouteGroupMessage";
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

        @inject("IHubShipmentAssignmentService") private _hubShipmentAssignmentService: IHubShipmentAssignmentService
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
                    }


                    /* -------- UPDATE LEG & ROUTE -------- */

                    const route = await this._routeRepo.findByBookingId(parcel.bookingId, session);
                    if (!route) continue;

                    const legs = await this._routeLegRepo.findByRouteId(route.id!, session);
                    const sortedLegs = legs.sort((a, b) => a.legOrder - b.legOrder);

                    let currentLeg  =
                        sortedLegs.find(l => l.status === "IN_PROGRESS") ||
                        sortedLegs.find(l => l.status === "PENDING");

                    console.log("Current Leg:😗😗😗😗😗😗😗😗😗😗😗😗😗😗😗😗:", currentLeg);

                    if (!currentLeg) continue;

                    /* -------- UPDATE LEG -------- */
                    if (status === "LOADED") {
                        currentLeg.status = "IN_PROGRESS";
                        currentLeg.shipmentId = shipmentId;

                        await this._routeLegRepo.update(currentLeg, session);
                    };

                    if (status === "UNLOADED") {


                        /* ---------------- BULK PICKUP → START FIRST LEG ---------------- */
                        if (shipment.type === "BULK_PICKUP") {


                            console.log("sortedLegs:😗😗😗😗😗😗😗😗😗😗😗😗😗😗😗😗:", sortedLegs);
                            const firstLeg = sortedLegs.find(l => l.legOrder === 1);

                            if (firstLeg && firstLeg.status === "PENDING") {
                                await this._routeLegRepo.update(firstLeg, session);

                                console.log("First Leg:😗😗😗😗😗😗😗😗😗😗😗😗😗😗😗😗:", firstLeg);

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

                            const nextLeg = sortedLegs.find(
                                l => l.legOrder === currentLeg.legOrder + 1
                            );

                            if (nextLeg) {
                                // nextLeg.status = "PENDING";
                                nextLeg.shipmentId = shipmentId

                                await this._routeLegRepo.update(nextLeg, session);

                                await this._hubShipmentAssignmentService.assignLegToShipment(
                                    nextLeg,
                                    parcel.bookingId,
                                    session
                                );
                            } else if (!nextLeg) {
                                console.log("jfjfjfjfjfjfjfjfjfjfjfjfjfj\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n:",
                                    "No next leg, route should be completing soon");
                                await this._createHubShipmentOutForDeliveryUsecase.execute(parcel.bookingId)

                                console.log("jfjfjfjfjfjfjfjfjfjfjfjfjfj\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n:",
                                    "No next leg, route should be completing soon");

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
}