import { BasePricingPolicy } from "../../../../Domain/Entities/Admin/BasePricingPolicy";
import { AdminPricingRequestDTO } from "../../../DTOs/Pricing/AdminPricingDTO";

export interface ICreateAdminPricingPolicyUseCase {
    execute(dto: AdminPricingRequestDTO): Promise<BasePricingPolicy>;
}