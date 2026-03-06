import { AgencyPricingPolicy } from "../../../Domain/Entities/Admin/AgencyPricingPolicy";
import { TravelerPricingPolicy } from "../../../Domain/Entities/Admin/TravelerPricingPolicy";
import { AdminPricingRequestDTO, AdminTravelerPricingRequestDTO } from "../../Dto/Pricing/adminPricing.dto";

export class AdminPricingPolicyMapper {

    static toAgencyPricingPolicyDTO(dto: AdminPricingRequestDTO, latestVersion: number): AgencyPricingPolicy {
        return new AgencyPricingPolicy(
            null,
            dto.minBasePrice,
            dto.maxBasePrice,
            dto.minPricePerKm,
            dto.maxPricePerKm,
            dto.minPricePerKg,
            dto.maxPricePerKg,
            dto.platformFeePercent,
            true,
            latestVersion + 1
        );
    }

    static toTravelerPricingPolicy(
        dto: AdminTravelerPricingRequestDTO,
        latestVersion: number
    ): TravelerPricingPolicy {
        return new TravelerPricingPolicy(
            null,

            dto.basePrice,
            dto.pricePerKm,

            dto.basePricePerKg,

            dto.transportMultipliers,

            dto.platformFeePercent,
            true,
            latestVersion + 1
        );
    }

}