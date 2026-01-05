import { AppError } from "../../utils/customError";

export type DeliveryModel = "AGENCY" | "TRAVELER";

export class PricingPolicy {
  constructor(
    public readonly id: string | null,

    public deliveryModel: DeliveryModel,

    public minBasePrice: number,
    public maxBasePrice: number,

    public minPricePerKm: number,
    public maxPricePerKm: number,

    public minPricePerKg: number,
    public maxPricePerKg: number,

    public platformFeePercent: number,

    public isActive: boolean,

    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {
    this.validate();
  }

  validate(): void {
    if (this.minBasePrice > this.maxBasePrice) {
      throw new AppError("minBasePrice cannot be greater than maxBasePrice");
    }

    if (this.minPricePerKm > this.maxPricePerKm) {
      throw new AppError("minPricePerKm cannot be greater than maxPricePerKm");
    }

    if (this.minPricePerKg > this.maxPricePerKg) {
      throw new AppError("minPricePerKg cannot be greater than maxPricePerKg");
    }

    if (this.platformFeePercent < 0 || this.platformFeePercent > 100) {
      throw new AppError("platformFeePercent must be between 0 and 100");
    }
  }
}
