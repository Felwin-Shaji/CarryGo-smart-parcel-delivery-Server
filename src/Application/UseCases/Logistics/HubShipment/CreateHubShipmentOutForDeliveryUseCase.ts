import { IHubShipmentRepository } from "../../../Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { IParcelMovementRepository } from "../../../Interfaces/Repositories/Logistics/IParcelMovementRepository";
import { IShipmentParcelRepository } from "../../../Interfaces/Repositories/Logistics/IShipmentParcelRepository";
import { IBookingRepository } from "../../../Interfaces/Repositories/User/IBookingRepository";
import { ICreateHubShipmentOutForDeliveryUsecase } from "../../../Interfaces/UseCases/Logistics/HubShipment/ICreateHubShipmentOutForDeliveryUseCase";
import { HubShipmentMapper } from "../../../Mappers/Logistics/HubShipmentMapper";
import { ParcelMovementMapper } from "../../../Mappers/Logistics/ParcelMovementMapper";
import { ShipmentParcelMapper } from "../../../Mappers/Logistics/ShipmentParcelMapper";
import { ClientSession } from "mongoose";
import { inject, injectable } from "tsyringe";
import { BOOKING_MESSAGE } from "../../../../Infrastructure/Constants/Messages/bookingMessages";
import { AppError } from "../../../../Domain/Utils/customError";
import { STATUS } from "../../../../Infrastructure/Constants/statusCodes";
import { HUB_MESSAGES } from "../../../../Infrastructure/Constants/Messages/hubMessage";
import { INotificationService } from "../../../Interfaces/Services/Notification/INotificationService";
import { INotificationSocketService } from "../../../Interfaces/Services/Notification/INotificationSocketService";

@injectable()
export class CreateHubShipmentOutForDeliveryUsecase implements ICreateHubShipmentOutForDeliveryUsecase {
    constructor(
        @inject("IBookingRepository") private readonly _bookingRepo: IBookingRepository,

        @inject("IHubShipmentRepository") private _hubShipmentRepository: IHubShipmentRepository,

        @inject("IShipmentParcelRepository") private _shipmentParcelRepository: IShipmentParcelRepository,

        @inject("IParcelMovementRepository") private _parcelMovementRepository: IParcelMovementRepository,

        @inject("INotificationService") private readonly _notificationService: INotificationService,

        @inject("INotificationSocketService") private readonly _notificationSocketService: INotificationSocketService,
    ) { }
    async execute(bookingId: string, session?: ClientSession): Promise<void> {
        const booking = await this._bookingRepo.getBookingById(bookingId);
        if (!booking) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND);

        const fromHubId = booking.logistics?.fromHubId;
        if (!fromHubId) throw new AppError(HUB_MESSAGES.LOGIDTICS_ID_MISSING, STATUS.BAD_REQUEST);

        const outForDeliveryShipment =
            await this._hubShipmentRepository.findOpenShipmentByHubAndType(
                fromHubId,
                "OUT_FOR_DELIVERY",
                session
            );

        let shipment = outForDeliveryShipment;

        if (!shipment) {

            shipment = await this._hubShipmentRepository.save(
                HubShipmentMapper.toCreateDelivery(booking),
                session
            );

            await this._notifyHubDeliveryShipmentCreated(
                fromHubId.toString(),
                booking.bookingId
            );

        } else {

            await this._hubShipmentRepository.findOneAndUpdate(
                { _id: shipment.id },
                { parcelCount: shipment.parcelCount + 1 },
                undefined,
                session
            );

            await this._notifyHubDeliveryShipmentUpdated(
                fromHubId.toString(),
                booking.bookingId
            );
        }

        await this._shipmentParcelRepository.save(
            ShipmentParcelMapper.toCreate(shipment.id!, bookingId),
            session
        );

        await this._parcelMovementRepository.save(
            ParcelMovementMapper.toDelivery(
                bookingId,
                shipment.id!,
                fromHubId
            ),
            session
        );

        await this._notifyCustomerOutForDeliveryReady(
            booking.userId.toString(),
            booking.bookingId
        );

    };

    private async _notifyHubDeliveryShipmentCreated(hubId: string, bookingId: string): Promise<void> {

        const notification = await this._notificationService.createNotification(
            hubId,
            "New Delivery Shipment Created",
            `A new out-for-delivery shipment has been created. Parcel ${bookingId} is waiting for worker assignment.`
        );

        this._notificationSocketService.emitNotification(hubId, notification);
    };

    private async _notifyHubDeliveryShipmentUpdated(hubId: string, bookingId: string): Promise<void> {

        const notification = await this._notificationService.createNotification(
            hubId,
            "Delivery Shipment Updated",
            `Parcel ${bookingId} has been added to an existing out-for-delivery shipment.`
        );

        this._notificationSocketService.emitNotification(hubId, notification);
    };

    private async _notifyCustomerOutForDeliveryReady(userId: string, bookingId: string): Promise<void> {

        const notification = await this._notificationService.createNotification(
            userId,
            "Parcel Out for Delivery",
            `Your parcel (${bookingId}) has been assigned for final delivery and will arrive soon.`
        );

        this._notificationSocketService.emitNotification(userId, notification);
    }
}   