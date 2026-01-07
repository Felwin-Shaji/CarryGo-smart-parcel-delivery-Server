import { PricingPolicy } from "../../../../Domain/Entities/Admin/PricingPolicy";
import { AdminPricingRequestDTO } from "../../../Dto/Pricing/adminPricing.dto";

export interface ICreateAdminPricingPolicyUseCase {
    execute(dto: AdminPricingRequestDTO): Promise<PricingPolicy>;
}