import { BasePricingPolicy } from "../../../../Domain/Entities/Admin/BasePricingPolicy";
import { AdminPricingRequestDTO } from "../../../DTOs/Pricing/adminPricing.dto";

export interface ICreateAdminPricingPolicyUseCase {
    execute(dto: AdminPricingRequestDTO): Promise<BasePricingPolicy>;
}