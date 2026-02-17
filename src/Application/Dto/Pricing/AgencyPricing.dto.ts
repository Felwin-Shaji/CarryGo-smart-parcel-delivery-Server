import { AgencyPricingPolicy} from "../../../Domain/Entities/Admin/AgencyPricingPolicy";
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
    policy:AgencyPricingPolicy;
    isOutdated:boolean;
}