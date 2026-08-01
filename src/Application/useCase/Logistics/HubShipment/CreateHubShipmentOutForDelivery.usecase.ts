import { IHubShipmentRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IParcelMovementRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelMovementRepository";
import { IShipmentParcelRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IBookingRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { ICreateHubShipmentOutForDeliveryUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/HubShipment/ICreateHubShipmentOutForDeliveryUsecase";
import { HubShipmentMapper } from "../../../Mappers/Logistics/HubShipmentMapper";
import { ParcelMovementMapper } from "../../../Mappers/Logistics/ParcelMovementMapper";
import { ShipmentParcelMapper } from "../../../Mappers/Logistics/ShipmentParcelMapper";
import { ClientSession } from "mongoose";
import { inject, injectable } from "tsyringe";
import { BOOKING_MESSAGE } from "../../../../Infrastructure/constants/messages/bookingMessages";
import { AppError } from "../../../../Domain/utils/customError";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { HUB_MESSAGES } from "../../../../Infrastructure/constants/messages/hubMessage";
import { INotificationService } from "../../../interfaces/services_Interfaces/Notification/INotificationService";
import { INotificationSocketService } from "../../../interfaces/services_Interfaces/Notification/INotificationSocketService";

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