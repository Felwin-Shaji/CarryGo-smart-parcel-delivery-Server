import { inject, injectable } from "tsyringe";
import { ICreateBookingUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/ICreateBookingUsecase";
import { IDistanceService } from "../../../interfaces/services_Interfaces/IDistanceService";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { IBookingRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { CalculatePriceRequestDTO, CreateBookingRequestDTO } from "../../../Dto/User/Booking.dto";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { AppError } from "../../../../Domain/utils/customError";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { Booking, PartnerEntity } from "../../../../Domain/Entities/Booking/Booking";
import { IAgencyRepository } from "../../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IPricingService } from "../../../interfaces/services_Interfaces/IPricingService";
import { BookingMapper } from "../../../Mappers/User/bookingMapper";

@injectable()
export class CreateBookingUsecase implements ICreateBookingUsecase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
        @inject("IPricingService") private _pricingService: IPricingService

    ) { };

    async execute(userId: string, payload: CreateBookingRequestDTO): Promise<{ bookingId: string }> {

        const pickup = await this._userRepo.getAddressById(userId, payload.pickupAddressId);
        const delivery = await this._userRepo.getAddressById(userId, payload.deliveryAddressId);

        if (!pickup || !delivery) {
            throw new AppError(USER_MESSAGES.INVALID_ADDRESS, STATUS.BAD_REQUEST);
        }

        let partnerSnapshot: PartnerEntity | null = null;

        if (payload.partnerId) {
            const agency = await this._agencyRepo.getAgencyById(payload.partnerId);

            partnerSnapshot = {
                partnerId: payload.partnerId,
                name: agency?.name ?? "Unknown",
                type: payload.deliveryType,
                contact: {
                    email: agency?.email,
                    phone: agency?.mobile,
                },
            };
        };


        const pricing = await this._pricingService.calculate(userId, payload);


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


