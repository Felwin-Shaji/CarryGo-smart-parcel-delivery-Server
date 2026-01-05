import { PricingPolicy } from "../../../../Domain/Entities/Admin/PricingPolicy";

export interface IGetPricingUseCase {
    execute(model: "AGENCY" | "TRAVELER"):Promise<PricingPolicy>;
};