export interface AdminPricingRequestDTO {
    deliveryModel: "AGENCY" | "TRAVELER";
    minBasePrice: number;
    maxBasePrice: number;
    minPricePerKm: number;
    maxPricePerKm: number;
    minPricePerKg: number;
    maxPricePerKg: number;
    platformFeePercent: number;
    isActive: boolean;
    policyVersion: number;
}

export interface AdminTravelerPricingRequestDTO {
  basePrice: number;
  pricePerKm: number;
  basePricePerKg: number;

  transportMultipliers: {
    FLIGHT: number;
    TRAIN: number;
    CAR: number;
    BUS: number;
    BIKE: number;
  };

  platformFeePercent: number;
}