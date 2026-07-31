import { IHubShipmentRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IParcelMovementRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelMovementRepository";
import { IShipmentParcelRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IBookingRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { ICreateHubShipmentPickUpUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/HubShipment/ICreateHubShipmentPickUpUsecase";
import { HubShipmentMapper } from "../../../Mappers/Logistics/HubShipmentMapper";
import { ParcelMovementMapper } from "../../../Mappers/Logistics/ParcelMovementMapper";
import { ShipmentParcelMapper } from "../../../Mappers/Logistics/ShipmentParcelMapper";
import { AppError } from "../../../../Domain/utils/customError";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { HUB_MESSAGES } from "../../../../Infrastructure/constants/messages/hubMessage";
import mongoose from "mongoose";
import { inject, injectable } from "tsyringe";
import { INotificationService } from "../../../interfaces/services_Interfaces/Notification/INotificationService";
import { INotificationSocketService } from "../../../interfaces/services_Interfaces/Notification/INotificationSocketService";

@injectable()
export class CreateHubShipmentPickUpUsecase implements ICreateHubShipmentPickUpUsecase {
    constructor(
        @inject("IBookingRepository") private readonly _bookingRepo: IBookingRepository,

        @inject("IHubShipmentRepository") private _hubShipmentRepository: IHubShipmentRepository,

        @inject("IShipmentParcelRepository") private _shipmentParcelRepository: IShipmentParcelRepository,

        @inject("IParcelMovementRepository") private _parcelMovementRepository: IParcelMovementRepository,

        @inject("INotificationService") private _notificationService: INotificationService,
        @inject("INotificationSocketService") private readonly _notificationSocketService: INotificationSocketService,

    ) { };
    async execute(bookingId: string): Promise<void> {

        const session = await mongoose.startSession();

        try {
            await session.withTransaction(async () => {

                const booking = await this._bookingRepo.getBookingById(bookingId);
                if (!booking) throw new AppError("Booking not found", 404);

                const toHubId = booking.logistics?.fromHubId;
                if (!toHubId) {
                    throw new AppError(HUB_MESSAGES.LOGIDTICS_ID_MISSING, STATUS.BAD_REQUEST);
                }

                // Find existing pickup shipment
                let pickUpshipment = await this._hubShipmentRepository
                    .findOpenShipmentByHubAndType(toHubId, "BULK_PICKUP", session);

                // Capacity check
                if (pickUpshipment && pickUpshipment.capacity !== null) {
                    if (pickUpshipment.parcelCount >= pickUpshipment.capacity) {
                        pickUpshipment = null;
                    }
                }

                // Create or update shipment
                if (!pickUpshipment) {
                    pickUpshipment = await this._hubShipmentRepository.save(
                        HubShipmentMapper.toCreatePickup(booking),
                        session
                    );

                    await this._notifyHubShipmentCreated(
                        toHubId.toString(),
                        booking.bookingId
                    );

                } else {
                    await this._hubShipmentRepository.findOneAndUpdate(
                        { _id: pickUpshipment.id },
                        { parcelCount: pickUpshipment.parcelCount + 1 },
                        undefined,
                        session
                    );

                    await this._notifyHubShipmentUpdated(
                        toHubId.toString(),
                        booking.bookingId
                    );
                }

                //  Attach parcel
                await this._shipmentParcelRepository.save(
                    ShipmentParcelMapper.toCreate(pickUpshipment.id!, bookingId),
                    session
                );

                // Movement log
                await this._parcelMovementRepository.save(
                    ParcelMovementMapper.toPickup(bookingId, pickUpshipment.id!, toHubId),
                    session
                );
                await this._bookingRepo.updateStatus(bookingId, "READY_FOR_PICKUP");
                
                await this._notifyCustomerPickupReady(
                    booking.userId.toString(),
                    booking.bookingId
                );
            });

        } finally {
            await session.endSession();
        }
    };

    private async _notifyHubShipmentCreated(
        hubId: string,
        bookingId: string
    ): Promise<void> {
        const notification = await this._notificationService.createNotification(
            hubId,
            "New Pickup Shipment Created",
            `A new pickup shipment has been created. Parcel ${bookingId} is awaiting worker assignment.`
        );

        this._notificationSocketService.emitNotification(hubId, notification);
    }

    private async _notifyHubShipmentUpdated(
        hubId: string,
        bookingId: string
    ): Promise<void> {
        const notification = await this._notificationService.createNotification(
            hubId,
            "Pickup Shipment Updated",
            `Parcel ${bookingId} has been added to an existing pickup shipment.`
        );

        this._notificationSocketService.emitNotification(hubId, notification);
    };

    private async _notifyCustomerPickupReady(
        userId: string,
        bookingId: string
    ): Promise<void> {
        const notification = await this._notificationService.createNotification(
            userId,
            "Parcel Ready for Pickup",
            `Your parcel (${bookingId}) is ready for pickup. A pickup partner will be assigned shortly.`
        );

        this._notificationSocketService.emitNotification(userId, notification);
    }
}