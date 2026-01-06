import { PricingPolicy } from "../../../Domain/Entities/Admin/PricingPolicy";
import { AgencyPricing } from "../../../Domain/Entities/Agency/AgencyPricing";

export interface UpdateAgencyPricingDTO {
    serviceType: "STANDARD" | "EXPRESS";
    basePrice: number;
    pricePerKm: number;
    sizePricing: {
        SMALL: { price: number };
        MEDIUM: { price: number };
        LARGE: { price: number };
    };
};

export interface AgencyPricingResponseDTO{
    agencyPricing:AgencyPricing;
    policy:PricingPolicy;
    isOutdated:boolean;
}