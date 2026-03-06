import { DeliveryPartner } from "../../Enums/DeliveryPartnerType";
import { AppError } from "../../utils/customError";
import { BasePricingPolicy } from "./BasePricingPolicy";

export type DeliveryModel = "AGENCY" | "TRAVELER";

export class AgencyPricingPolicy extends BasePricingPolicy {
  constructor(
    id: string | null,

    public minBasePrice: number,
    public maxBasePrice: number,

    public minPricePerKm: number,
    public maxPricePerKm: number,

    public minPricePerKg: number,
    public maxPricePerKg: number,

    platformFeePercent: number,
    isActive: boolean,
    policyVersion: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(
      id,
      DeliveryPartner.AGENCY,
      platformFeePercent,
      isActive,
      policyVersion,
      createdAt,
      updatedAt
    );

    this.validate();
  }

  validate(): void {
    if (this.minBasePrice > this.maxBasePrice) {
      throw new AppError("Invalid base price range");
    }

    if (this.minPricePerKm > this.maxPricePerKm) {
      throw new AppError("Invalid price per km range");
    }

    if (this.minPricePerKg > this.maxPricePerKg) {
      throw new AppError("Invalid price per kg range");
    }
  }

  toPersistence() {
    return {
      deliveryModel: this.deliveryModel,

      minBasePrice: this.minBasePrice,
      maxBasePrice: this.maxBasePrice,

      minPricePerKm: this.minPricePerKm,
      maxPricePerKm: this.maxPricePerKm,

      minPricePerKg: this.minPricePerKg,
      maxPricePerKg: this.maxPricePerKg,

      platformFeePercent: this.platformFeePercent,
      isActive: this.isActive,
      policyVersion: this.policyVersion,
    };
  }
}