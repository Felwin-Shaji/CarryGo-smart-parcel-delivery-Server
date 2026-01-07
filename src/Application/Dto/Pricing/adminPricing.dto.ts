export interface AdminPricingRequestDTO {
    deliveryModel: "AGENCY" | "TRAVELER";   
    minBasePrice: number;
    maxBasePrice: number;
    minPricePerKm: number;
    maxPricePerKm: number;
    minSizePrice: number;
    maxSizePrice: number;
    platformFeePercent: number;
    isActive: boolean;
    policyVersion: number;
}