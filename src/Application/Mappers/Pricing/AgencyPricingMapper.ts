import { AgencyPricingPolicy } from "../../../Domain/Entities/Admin/AgencyPricingPolicy";
import { AgencyPricing } from "../../../Domain/Entities/Agency/AgencyPricing";
import { UpdateAgencyPricingDTO } from "../../Dto/Pricing/AgencyPricing.dto";

export class AgencyPricingMapper {

  static toAgencyPricingDTO(
    agencyId: string,
    dto: UpdateAgencyPricingDTO,
    policyVersion: number
  ): AgencyPricing {

    return new AgencyPricing(
      null,
      agencyId,
      dto.serviceType,

      dto.basePrice,
      dto.pricePerKm,

      dto.pricePerKg,

      true,
      policyVersion
    );
  }

  static toAdminDefaultPricing(
    agencyId: string,
    policy: AgencyPricingPolicy
  ): AgencyPricing {

    return new AgencyPricing(
      null,
      agencyId,
      "STANDARD",

      policy.minBasePrice,
      policy.minPricePerKm,

      policy.minPricePerKg,

      true,
      policy.policyVersion
    );
  }

}