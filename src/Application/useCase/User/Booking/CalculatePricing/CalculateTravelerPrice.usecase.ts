import { inject, injectable } from "tsyringe";
import { BasePricingPolicy } from "../../../../../Domain/Entities/Admin/BasePricingPolicy";
import { TravelerPricingPolicy } from "../../../../../Domain/Entities/Admin/TravelerPricingPolicy";
import { AppError } from "../../../../../Domain/utils/customError";
import { PRICING_POLICY_MESSAGE } from "../../../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../Dto/User/Booking.dto";
import { ICalculatePriceUsecase } from "../../../../interfaces/useCase_Interfaces/user/Booking/CalculatePricing/ICalculatePrice";
import { ITravelRequestRepository } from "../../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";

@injectable()
export class TravelerPricingUsecase implements ICalculatePriceUsecase {
    constructor(
        @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository,

    ) { };

    async execute(policy: BasePricingPolicy, dto: CalculatePriceRequestDTO, distanceKm: number): Promise<CalculatePriceResponseDTO> {

        if (!(policy instanceof TravelerPricingPolicy)) throw new AppError(PRICING_POLICY_MESSAGE.INVALID_POLICY);

        const weight = dto.packageDetails.weightKg;

        const travelRequest = await this._travelRequestRepository.getTravelRequestById(dto.partnerId!)
        const multiplier = policy.getMultiplier(travelRequest.modeOfTransport)

        const base = policy.basePricePerKg * weight * multiplier;

        const platformFee = (base * policy.platformFeePercent) / 100;

        const totalPrice = Math.round(base + platformFee);

        return {
            distanceKm: this.round(distanceKm),
            basePrice: this.round(base),
            distanceCharge: 0,
            sizeCharge: 0,
            platformFee: this.round(platformFee),
            totalPrice,
            currency: "INR",
        };
    }

    private round(n: number) { return Math.round(n * 100) / 100; }

}