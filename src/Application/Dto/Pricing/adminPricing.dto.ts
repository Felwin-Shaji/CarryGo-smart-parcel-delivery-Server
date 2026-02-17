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

export interface AdminTravelerPricingRequestDTO {
    basePricePerKg: number;

    flightMultiplier: number;
    trainMultiplier: number;
    carMultiplier: number;
    busMultiplier: number;
    bikeMultiplier: number;

    platformFeePercent: number;
}