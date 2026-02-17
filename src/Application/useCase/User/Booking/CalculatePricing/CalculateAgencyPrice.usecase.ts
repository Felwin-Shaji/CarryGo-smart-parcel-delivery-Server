import { inject, injectable } from "tsyringe";
import { AgencyPricingPolicy } from "../../../../../Domain/Entities/Admin/AgencyPricingPolicy";
import { BasePricingPolicy } from "../../../../../Domain/Entities/Admin/BasePricingPolicy";
import { AppError } from "../../../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../../../../Infrastructure/constants/messages/agencyMessages";
import { PRICING_POLICY_MESSAGE } from "../../../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { STATUS } from "../../../../../Infrastructure/constants/statusCodes";
import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../Dto/User/Booking.dto";
import { ICalculatePriceUsecase } from "../../../../interfaces/useCase_Interfaces/user/Booking/CalculatePricing/ICalculatePrice";
import { IAgencyPricingRepository } from "../../../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agencyPricing.repository";

@injectable()
export class CalculateAgencyPriceUsecase implements ICalculatePriceUsecase {
    constructor(
        @inject("IAgencyPricingRepository") private _agencyPricingRepository: IAgencyPricingRepository,

    ) { }
    async execute(policy: BasePricingPolicy, dto: CalculatePriceRequestDTO, distanceKm: number): Promise<CalculatePriceResponseDTO> {

        if (!(policy instanceof AgencyPricingPolicy)) throw new AppError(PRICING_POLICY_MESSAGE.INVALID_POLICY);

        const { partnerId, packageDetails } = dto;
        if (!partnerId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const agencyPricing = await this._agencyPricingRepository.getPricingByAgency(partnerId, "STANDARD");
        if (!agencyPricing) throw new AppError(AGENCY_MESSAGES.PRICING_NOT_FOUND);

        const basePrice = policy.minBasePrice;
        const pricePerKm = policy.minPricePerKm;

        const distanceCharge = distanceKm * pricePerKm;

        const sizeCharge =
            agencyPricing.sizePricing[packageDetails.size].price;

        const subTotal = basePrice + distanceCharge + sizeCharge;
        const platformFee =
            (subTotal * policy.platformFeePercent) / 100;

        const totalPrice = Math.round(subTotal + platformFee);

        return {
            distanceKm: this.round(distanceKm),
            basePrice: this.round(basePrice),
            distanceCharge: this.round(distanceCharge),
            sizeCharge: this.round(sizeCharge),
            platformFee: this.round(platformFee),
            totalPrice,
            currency: "INR",
        };
    }

    private round(n: number) { return Math.round(n * 100) / 100; }
}