import { BasePricingPolicy } from "../../../../Domain/Entities/Admin/BasePricingPolicy";

export interface IGetPricingUseCase {
    execute(model: "AGENCY" | "TRAVELER"): Promise<BasePricingPolicy>;
};