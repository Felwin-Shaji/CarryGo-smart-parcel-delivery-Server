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

@injectable()
export class CreateHubShipmentPickUpUsecase implements ICreateHubShipmentPickUpUsecase {
    constructor(
        @inject("IBookingRepository") private readonly _bookingRepo: IBookingRepository,

        @inject("IHubShipmentRepository") private _hubShipmentRepository: IHubShipmentRepository,

        @inject("IShipmentParcelRepository") private _shipmentParcelRepository: IShipmentParcelRepository,

        @inject("IParcelMovementRepository") private _parcelMovementRepository: IParcelMovementRepository,


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
                } else {
                    await this._hubShipmentRepository.findOneAndUpdate(
                        { _id: pickUpshipment.id },
                        { parcelCount: pickUpshipment.parcelCount + 1 },
                        undefined,
                        session
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
            });

        } finally {
            await session.endSession();
        }
    }
}