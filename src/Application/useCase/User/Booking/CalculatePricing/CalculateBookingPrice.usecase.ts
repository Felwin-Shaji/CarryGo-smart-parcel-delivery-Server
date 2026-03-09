import { inject, injectable } from "tsyringe";
import { ICalculateBookingPriceUsecase } from "../../../../interfaces/useCase_Interfaces/user/Booking/ICalculateBookingPriceUsecase";
import { IDistanceService } from "../../../../interfaces/services_Interfaces/IDistanceService";
import { IPricingPolicyRepository } from "../../../../interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { IUserRepository } from "../../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../Dto/User/Booking.dto";
import { AppError } from "../../../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../../Infrastructure/constants/statusCodes";
import { PRICING_POLICY_MESSAGE } from "../../../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { ICalculatePriceUsecase } from "../../../../interfaces/useCase_Interfaces/user/Booking/CalculatePricing/ICalculatePrice";

@injectable()
export class CalculateBookingPriceUsecase implements ICalculateBookingPriceUsecase {
    constructor(
        @inject("IDistanceService") private _distanceService: IDistanceService,
        @inject("IPricingPolicyRepository") private _pricingPolicyRepository: IPricingPolicyRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository,

        @inject("CalculateAgencyPriceUsecase") private _agencyPriceUsecase: ICalculatePriceUsecase,
        @inject("TravelerPricingUsecase") private _travelerPriceUsecase: ICalculatePriceUsecase
    ) { }

    async execute(userId: string, dto: CalculatePriceRequestDTO): Promise<CalculatePriceResponseDTO> {

        const { deliveryType, pickupAddress, deliveryAddress } = dto;

        // const pickupAddresss = await this._userRepo.getAddressById(userId, pickupAddressId);
        // const deliveryAddress = await this._userRepo.getAddressById(userId, deliveryAddressId);

        if (!pickupAddress || !deliveryAddress) {
            throw new AppError(USER_MESSAGES.INVALID_ADDRESS, STATUS.BAD_REQUEST);
        }

        const distanceKm = this._distanceService.calculateDistanceInKilometers(pickupAddress.location, deliveryAddress.location);

        const pricingPolicy = await this._pricingPolicyRepository.getActiveByDeliveryModel(deliveryType);
        if (!pricingPolicy) throw new AppError(PRICING_POLICY_MESSAGE.ADMIN_PRICING_POLICY_NOT_FOUND, STATUS.NOT_FOUND);

        if (deliveryType === "AGENCY") {
            return this._agencyPriceUsecase.execute(
                pricingPolicy,
                dto,
                distanceKm
            );
        }

        if (deliveryType === "TRAVELER") {
            return this._travelerPriceUsecase.execute(
                pricingPolicy,
                dto,
                distanceKm
            );
        }

        throw new AppError("Unsupported delivery type", STATUS.BAD_REQUEST);

    }
}