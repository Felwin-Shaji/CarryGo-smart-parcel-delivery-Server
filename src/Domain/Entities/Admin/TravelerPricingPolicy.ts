import { DeliveryPartner } from "../../Enums/DeliveryPartnerType";
import { AppError } from "../../utils/customError";
import { TransportMode } from "../User/TravelRequest";
import { BasePricingPolicy } from "./BasePricingPolicy";

export type TransportMultiplierMap = Record<string, number>;

export class TravelerPricingPolicy extends BasePricingPolicy {
  constructor(
    id: string | null,

    public basePrice: number,
    public pricePerKm: number,

    public basePricePerKg: number,

    public transportMultipliers: TransportMultiplierMap,

    platformFeePercent: number,
    isActive: boolean,
    policyVersion: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(
      id,
      DeliveryPartner.TRAVELER,
      platformFeePercent,
      isActive,
      policyVersion,
      createdAt,
      updatedAt
    );

    this.validate();
  }

  validate(): void {
    if (this.basePrice < 0) {
      throw new AppError("Base price cannot be negative");
    }

    if (this.pricePerKm <= 0) {
      throw new AppError("Price per km must be positive");
    }

    if (this.basePricePerKg <= 0) {
      throw new AppError("Base price per kg must be positive");
    }

    for (const [mode, multiplier] of Object.entries(this.transportMultipliers)) {
      if (multiplier <= 0) {
        throw new AppError(`Invalid multiplier for ${mode}`);
      }
    }
  }

  toPersistence() {
    return {
      deliveryModel: this.deliveryModel,

      basePrice: this.basePrice,
      pricePerKm: this.pricePerKm,
      basePricePerKg: this.basePricePerKg,

      transportMultipliers: this.transportMultipliers,

      platformFeePercent: this.platformFeePercent,
      isActive: this.isActive,
      policyVersion: this.policyVersion,
    };
  }

  public getMultiplier(mode: TransportMode): number {
    const multiplier = this.transportMultipliers[mode];

    if (!multiplier) {
      throw new AppError(`Multiplier not defined for ${mode}`);
    }

    return multiplier;
  }
}