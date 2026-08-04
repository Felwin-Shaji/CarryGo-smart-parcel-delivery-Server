import { BasePricingPolicy } from "../../../../Domain/Entities/Admin/BasePricingPolicy";
import { AdminTravelerPricingRequestDTO } from "../../../DTOs/Pricing/adminPricing.dto";

export interface ICreateAdminTravelerPricingUsecase {
    execute(dto: AdminTravelerPricingRequestDTO): Promise<BasePricingPolicy>;
}