import { inject, injectable } from "tsyringe";
import { ICalculateBookingPriceUsecase } from "../../../../Interfaces/UseCases/User/Booking/ICalculateBookingPriceUsecase";
import { IDistanceService } from "../../../../Interfaces/Services/IDistanceService";
import { IPricingPolicyRepository } from "../../../../Interfaces/Repositories/Admin/IPricingPolicyRepository";
import { IUserRepository } from "../../../../Interfaces/Repositories/User/user.repository";
import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../DTOs/User/BookingDTO";
import { AppError } from "../../../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../../../Infrastructure/Constants/Messages/userMessage";
import { STATUS } from "../../../../../Infrastructure/Constants/statusCodes";
import { PRICING_POLICY_MESSAGE } from "../../../../../Infrastructure/Constants/Messages/pricingPolicyMessage";
import { ICalculatePriceUsecase } from "../../../../Interfaces/UseCases/User/Booking/CalculatePricing/ICalculatePrice";

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