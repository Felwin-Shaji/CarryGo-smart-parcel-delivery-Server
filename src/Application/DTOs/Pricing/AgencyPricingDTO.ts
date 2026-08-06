import { AgencyPricingPolicy } from "../../../Domain/Entities/Admin/AgencyPricingPolicy";
import { AgencyPricing } from "../../../Domain/Entities/Agency/AgencyPricing";

export interface UpdateAgencyPricingDTO {
  serviceType: "STANDARD" | "EXPRESS";

  basePrice: number;

  pricePerKm: number;

  pricePerKg: number;
}

export interface AgencyPricingResponseDTO {
  agencyPricing: AgencyPricing;
  policy: AgencyPricingPolicy;
  isOutdated: boolean;
}