import { BasePricingPolicy } from "../../../../Domain/Entities/Admin/BasePricingPolicy";
import { AdminTravelerPricingRequestDTO } from "../../../Dto/Pricing/adminPricing.dto";

export interface ICreateAdminTravelerPricingUsecase {
    execute(dto: AdminTravelerPricingRequestDTO): Promise<BasePricingPolicy>;
}