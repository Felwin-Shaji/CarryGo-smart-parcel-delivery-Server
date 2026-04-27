import { inject, injectable } from "tsyringe";
import { ICreateBookingUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/ICreateBookingUsecase";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { IBookingRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { CreateBookingRequestDTO } from "../../../Dto/User/Booking.dto";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { AppError } from "../../../../Domain/utils/customError";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { PartnerEntity } from "../../../../Domain/Entities/Booking/Booking";
import { IAgencyRepository } from "../../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { BookingMapper } from "../../../Mappers/User/bookingMapper";
import { ICalculateBookingPriceUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/ICalculateBookingPriceUsecase";
import { ITravelRequestRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { AGENCY_MESSAGES } from "../../../../Infrastructure/constants/messages/agencyMessages";
import { DeliveryPartner } from "../../../../Domain/Enums/DeliveryPartnerType";
import { IBookingIdGeneratorService } from "@/Application/interfaces/services_Interfaces/IBookingIdGeneratorService";
import { ICounterRepository } from "@/Application/interfaces/repositories_interfaces/ICounterRepository";
import { buildCounterKey } from "@/Domain/utils/counterKey.util";

@injectable()
export class CreateBookingUsecase implements ICreateBookingUsecase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
        @inject("ICalculateBookingPriceUsecase") private _calculateBookingPriceUsecase: ICalculateBookingPriceUsecase,
        @inject("ITravelRequestRepository") private _travelRequestRepo: ITravelRequestRepository,
        @inject("IBookingIdGeneratorService") private _bookingIdGenerator: IBookingIdGeneratorService,
        @inject("ICounterRepository") private _counterRepo: ICounterRepository
    ) { };

    async execute(userId: string, payload: CreateBookingRequestDTO): Promise<{ bookingId: string }> {

        const pickup = payload.pickupAddress;
        const delivery = payload.deliveryAddress;

        if (!pickup || !delivery) {
            throw new AppError(USER_MESSAGES.INVALID_ADDRESS, STATUS.BAD_REQUEST);
        }

        let partnerSnapshot: PartnerEntity | null = null;
        let travelRequest = null;

        if (payload.partnerId) {

            if (payload.deliveryType === DeliveryPartner.AGENCY) {

                const agency =
                    await this._agencyRepo.getAgencyById(payload.partnerId);

                if (!agency)
                    throw new AppError(AGENCY_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

                partnerSnapshot = {
                    partnerId: payload.partnerId,
                    name: agency.name,
                    type: DeliveryPartner.AGENCY,
                    contact: {
                        email: agency.email,
                        phone: agency.mobile,
                    },
                };
            }

            if (payload.deliveryType === DeliveryPartner.TRAVELER) {

                if (!payload.travelRequestId) throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_ID_MISSING, STATUS.BAD_REQUEST);

                travelRequest = await this._travelRequestRepo.getTravelRequestById(payload.travelRequestId);
                if (!travelRequest) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

                if (!travelRequest.canAcceptPackage(payload.packageDetails)) {
                    throw new AppError(USER_MESSAGES.REMAINING_CAPACITY_ERROR, STATUS.BAD_REQUEST);
                }

                const traveler = await this._userRepo.findById({ _id: travelRequest.travelerId })
                if (!traveler) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND)

                // travelRequest.reduceCapacity(payload.packageDetails);
                // await this._travelRequestRepo.update(travelRequest);


                if (!travelRequest)
                    throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

                partnerSnapshot = {
                    partnerId: travelRequest.id!,
                    name: traveler?.name,
                    type: DeliveryPartner.TRAVELER,
                    contact: {
                        email: traveler.email,
                        phone: traveler.mobile
                    },
                };
            }
        }


        const pricing = await this._calculateBookingPriceUsecase.execute(userId, payload);

        const key = buildCounterKey(payload.deliveryType);
        const seq = await this._counterRepo.increment(key);

        const bookingId = this._bookingIdGenerator.generateBookingId({
            seq,
            agencyName: partnerSnapshot ? partnerSnapshot.name : "DIRECT",
            partnerType: payload.deliveryType,
        });

        console.log("Generated Booking ID:", bookingId, "✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");

        const booking = BookingMapper.createNew({
            bookingId,
            userId,
            deliveryPartnerType: payload.deliveryType,
            partnerSnapshot,
            fromHubId: payload.deliveryType === "AGENCY" ? payload.fromHubId : null,
            toHubId: payload.deliveryType === "AGENCY" ? payload.toHubId : null,
            pickup,
            delivery,
            packageDetails: payload.packageDetails,
            pricing,

        });

        const saved = await this._bookingRepo.create(booking);
        if (payload.deliveryType === DeliveryPartner.TRAVELER && travelRequest) {
            travelRequest.reduceCapacity(payload.packageDetails);
            await this._travelRequestRepo.update(travelRequest);
        }

        return { bookingId: saved.id! };
    }
}


