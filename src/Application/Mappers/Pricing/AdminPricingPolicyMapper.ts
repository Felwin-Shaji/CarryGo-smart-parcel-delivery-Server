import { PricingPolicy } from "../../../Domain/Entities/Admin/PricingPolicy";
import { AdminPricingRequestDTO } from "../../Dto/Pricing/adminPricing.dto";

export class AdminPricingPolicyMapper {

    static toPricingPolicyDTO(dto: AdminPricingRequestDTO, latestVersion: number): PricingPolicy {
        return new PricingPolicy(
            null,
            "AGENCY",

            dto.minBasePrice,
            dto.maxBasePrice,

            dto.minPricePerKm,
            dto.maxPricePerKm,

            dto.minSizePrice,
            dto.maxSizePrice,

            dto.platformFeePercent,

            true,
            latestVersion + 1
        );
    }
}