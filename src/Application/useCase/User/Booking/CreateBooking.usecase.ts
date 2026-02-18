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
import { afterEach } from "node:test";
import { DeliveryPartner } from "../../../../Domain/Enums/DeliveryPartnerType";

@injectable()
export class CreateBookingUsecase implements ICreateBookingUsecase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
        @inject("ICalculateBookingPriceUsecase") private _calculateBookingPriceUsecase: ICalculateBookingPriceUsecase,
        @inject("ITravelRequestRepository") private _travelRequestRepo: ITravelRequestRepository,


    ) { };

    async execute(userId: string, payload: CreateBookingRequestDTO): Promise<{ bookingId: string }> {

        const pickup = await this._userRepo.getAddressById(userId, payload.pickupAddressId);
        const delivery = await this._userRepo.getAddressById(userId, payload.deliveryAddressId);

        if (!pickup || !delivery) {
            throw new AppError(USER_MESSAGES.INVALID_ADDRESS, STATUS.BAD_REQUEST);
        }

        let partnerSnapshot: PartnerEntity | null = null;

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

                const travelRequest = await this._travelRequestRepo.getTravelRequestById(payload.travelRequestId);

                if (payload.packageDetails.weightKg > travelRequest.remainingCapacityKg) throw new AppError(USER_MESSAGES.REMAINING_CAPACITY_ERROR, STATUS.BAD_REQUEST);
                travelRequest.reduceCapacity(payload.packageDetails.weightKg);

                const traveler = await this._userRepo.findById({_id:travelRequest.travelerId})
                if(!traveler) throw new AppError(USER_MESSAGES.NOT_FOUND,STATUS.NOT_FOUND)

                await this._travelRequestRepo.update(travelRequest);


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


        const booking = BookingMapper.createNew({
            userId,
            deliveryPartnerType: payload.deliveryType,
            partnerSnapshot,
            pickup,
            delivery,
            packageDetails: payload.packageDetails,
            pricing,
        });

        const saved = await this._bookingRepo.create(booking);

        return { bookingId: saved.id! };
    }
}


