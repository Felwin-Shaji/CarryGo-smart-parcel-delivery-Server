import { BasePricingPolicy } from "../../../../Domain/Entities/Admin/BasePricingPolicy";
import { AdminTravelerPricingRequestDTO } from "../../../DTOs/Pricing/AdminPricingDTO";

export interface ICreateAdminTravelerPricingUsecase {
    execute(dto: AdminTravelerPricingRequestDTO): Promise<BasePricingPolicy>;
}