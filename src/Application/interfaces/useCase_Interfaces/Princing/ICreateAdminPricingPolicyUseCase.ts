import { AgencyPricingPolicy } from "../../../../Domain/Entities/Admin/AgencyPricingPolicy";
import { BasePricingPolicy } from "../../../../Domain/Entities/Admin/BasePricingPolicy";
import { AdminPricingRequestDTO } from "../../../Dto/Pricing/adminPricing.dto";

export interface ICreateAdminPricingPolicyUseCase {
    execute(dto: AdminPricingRequestDTO): Promise<BasePricingPolicy>;
}