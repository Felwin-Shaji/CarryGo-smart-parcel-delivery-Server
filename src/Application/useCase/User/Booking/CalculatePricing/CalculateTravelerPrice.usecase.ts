import { inject, injectable } from "tsyringe";
import { BasePricingPolicy } from "../../../../../Domain/Entities/Admin/BasePricingPolicy";
import { TravelerPricingPolicy } from "../../../../../Domain/Entities/Admin/TravelerPricingPolicy";
import { AppError } from "../../../../../Domain/utils/customError";
import { PRICING_POLICY_MESSAGE } from "../../../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../Dto/User/Booking.dto";
import { ICalculatePriceUsecase } from "../../../../interfaces/useCase_Interfaces/user/Booking/CalculatePricing/ICalculatePrice";
import { ITravelRequestRepository } from "../../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { USER_MESSAGES } from "../../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../../Infrastructure/constants/statusCodes";

@injectable()
export class TravelerPricingUsecase implements ICalculatePriceUsecase {
    constructor(
        @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository,

    ) { };

    async execute(policy: BasePricingPolicy, dto: CalculatePriceRequestDTO, distanceKm: number): Promise<CalculatePriceResponseDTO> {

        console.log(dto, '❤️❤️❤️❤️')

        if (!(policy instanceof TravelerPricingPolicy)) throw new AppError(PRICING_POLICY_MESSAGE.INVALID_POLICY);
        if (!dto.travelRequestId) throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_ID_MISSING, STATUS.BAD_REQUEST);

        const travelRequest = await this._travelRequestRepository.getTravelRequestById(dto.travelRequestId);

        const weight = dto.packageDetails.weightKg;
        if (weight > travelRequest.remainingCapacityKg) throw new AppError(USER_MESSAGES.REMAINING_CAPACITY_ERROR, STATUS.BAD_REQUEST);

        const effectivePricePerKg = travelRequest.pricePerKg ?? policy.basePricePerKg;
        const transportMultiplier = policy.getMultiplier(travelRequest.modeOfTransport);
        const weightCost = effectivePricePerKg * weight * transportMultiplier;
        const distanceCost = distanceKm * 2;/////adgest later
        const subTotal = weightCost + distanceCost;
        const platformFee = (subTotal * policy.platformFeePercent) / 100;


        const totalPrice = Math.round(subTotal + platformFee);

        console.log(dto.partnerId, "👆👆👆👆🔻🔻🔻")





        return {
            distanceKm: this.round(distanceKm),
            basePrice: this.round(weightCost),
            distanceCharge: 0,
            volumetricCharge: 0,
            platformFee: this.round(platformFee),
            totalPrice,
            currency: "INR",
        };
    }

    private round(n: number) { return Math.round(n * 100) / 100; }

}