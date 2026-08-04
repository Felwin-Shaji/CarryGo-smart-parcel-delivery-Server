import { inject, injectable } from "tsyringe";
import { IGetPricingUseCase } from "../../Interfaces/UseCases/Pricing/getPricing.usecase";
import { IPricingPolicyRepository } from "../../Interfaces/Repositories/Admin/IPricingPolicyRepository";
import { AppError } from "../../../Domain/Utils/customError";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/Constants/Messages/pricingPolicyMessage";
import { BasePricingPolicy } from "../../../Domain/Entities/Admin/BasePricingPolicy";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";

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