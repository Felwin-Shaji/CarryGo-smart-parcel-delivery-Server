import { inject, injectable, injectAll } from "tsyringe";
import { IGetPricingUseCase } from "../../interfaces/useCase_Interfaces/Princing/getPricing.usecase";
import { IPricingPolicyRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { AppError } from "../../../Domain/utils/customError";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { BasePricingPolicy } from "../../../Domain/Entities/Admin/BasePricingPolicy";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

@injectable()
export class GetPricingUseCase implements IGetPricingUseCase {
    constructor(
        @inject("IPricingPolicyRepository") private _pricingPolicyRepo: IPricingPolicyRepository
    ) { }

    async execute(model: "AGENCY" | "TRAVELER"): Promise<BasePricingPolicy> {
        const pricing = await this._pricingPolicyRepo.getActiveByDeliveryModel(model);
        if (!pricing) throw new AppError(PRICING_POLICY_MESSAGE.FETCH_PRICING_POLICY_FAILED,STATUS.NOT_FOUND);
        return pricing
    }
}