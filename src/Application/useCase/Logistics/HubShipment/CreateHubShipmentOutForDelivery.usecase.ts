import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IParcelMovementRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelMovementRepository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IBookingRepository } from "@/Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { ICreateHubShipmentOutForDeliveryUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/HubShipment/ICreateHubShipmentOutForDeliveryUsecase";
import { HubShipmentMapper } from "@/Application/Mappers/Logistics/HubShipmentMapper";
import { ParcelMovementMapper } from "@/Application/Mappers/Logistics/ParcelMovementMapper";
import { ShipmentParcelMapper } from "@/Application/Mappers/Logistics/ShipmentParcelMapper";
import { AppError } from "@/Domain/utils/customError";
import { BOOKING_MESSAGE } from "@/Infrastructure/constants/messages/bookingMessages";
import { HUB_MESSAGES } from "@/Infrastructure/constants/messages/hubMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { ClientSession } from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateHubShipmentOutForDeliveryUsecase implements ICreateHubShipmentOutForDeliveryUsecase {
    constructor(
        @inject("IBookingRepository") private readonly _bookingRepo: IBookingRepository,

        @inject("IHubShipmentRepository") private _hubShipmentRepository: IHubShipmentRepository,

        @inject("IShipmentParcelRepository") private _shipmentParcelRepository: IShipmentParcelRepository,

        @inject("IParcelMovementRepository") private _parcelMovementRepository: IParcelMovementRepository,
    ) { }
    async execute(bookingId: string, session?: ClientSession): Promise<void> {
        const booking = await this._bookingRepo.getBookingById(bookingId);
        if (!booking) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND);

        const fromHubId = booking.logistics?.fromHubId;
        if (!fromHubId) throw new AppError(HUB_MESSAGES.LOGIDTICS_ID_MISSING, STATUS.BAD_REQUEST);

        let outForDeleveryShipment = await this._hubShipmentRepository
            .findOpenShipmentByHubAndType(fromHubId, "OUT_FOR_DELIVERY", session);

        if (outForDeleveryShipment && outForDeleveryShipment.capacity !== null) {
            if (outForDeleveryShipment.parcelCount >= outForDeleveryShipment.capacity) {
                outForDeleveryShipment = null;
            }
        }

        if (!outForDeleveryShipment) {
            console.log("hshshshshshshshhhhhhhhhhhhhhhhhhhhhhhhh")
            outForDeleveryShipment = await this._hubShipmentRepository.save(
                HubShipmentMapper.toCreateDelivery(booking),
                session
            )
            console.log("00000000000000000000000000000000000000000000000000000000")

        } else {
            await this._hubShipmentRepository.findOneAndUpdate(
                { _id: outForDeleveryShipment.id },
                { parcelCount: outForDeleveryShipment.parcelCount + 1 },
                undefined,
                session
            )
        }

        await this._shipmentParcelRepository.save(
            ShipmentParcelMapper.toCreate(outForDeleveryShipment.id!, bookingId),
            session
        )

        await this._parcelMovementRepository.save(
            ParcelMovementMapper.toDelivery(bookingId, outForDeleveryShipment.id!, fromHubId)
        )

        console.log("11111111111111111122222222222222222222222\n3333333333333333333333333333\n44444444444444444444444444444444444",
            outForDeleveryShipment
        )

    }
}   