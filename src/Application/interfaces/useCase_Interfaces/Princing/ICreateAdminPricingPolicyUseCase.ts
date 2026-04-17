import { BasePricingPolicy } from "../../../../Domain/Entities/Admin/BasePricingPolicy";
import { AdminPricingRequestDTO } from "../../../Dto/Pricing/adminPricing.dto";

export interface ICreateAdminPricingPolicyUseCase {
    execute(dto: AdminPricingRequestDTO): Promise<BasePricingPolicy>;
}