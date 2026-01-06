import { PricingPolicy } from "../../../Domain/Entities/Admin/PricingPolicy";
import { AgencyPricing } from "../../../Domain/Entities/Agency/AgencyPricing";
import { UpdateAgencyPricingDTO } from "../../Dto/Pricing/AgencyPricing.dto";

export class AgencyPricingMapper {
    static toAgencyPricingDTO(agencyId: string, dto: UpdateAgencyPricingDTO,policyVersion:number): AgencyPricing {
        return new AgencyPricing(
            null,                // id (upsert)
            agencyId,
            dto.serviceType,

            dto.basePrice,
            dto.pricePerKm,

            dto.sizePricing,

            true,
            policyVersion
        );
    }

    static toAdminDefaultPricing(agencyId: string, policy: PricingPolicy):AgencyPricing{
        return new AgencyPricing(
            null,
            agencyId,
            "STANDARD",
            policy.minBasePrice,
            policy.minPricePerKm,
            {
                SMALL: { price: policy.minSizePrice },
                MEDIUM: { price: policy.minSizePrice },
                LARGE: { price: policy.minSizePrice },
            },
            true,                     
            policy.policyVersion
        );
    }
}