import { AppError } from "../../utils/customError";

export type ServiceType = "STANDARD" | "EXPRESS";
export type SizeCategory = "SMALL" | "MEDIUM" | "LARGE";

export interface SizePricing {
  price: number;
}

export interface SizePricingMap {
  SMALL: SizePricing;
  MEDIUM: SizePricing;
  LARGE: SizePricing;
}

export class AgencyPricing {
  constructor(
    public readonly id: string | null,

    public agencyId: string,
    public serviceType: ServiceType,

    public basePrice: number,
    public pricePerKm: number,

    public sizePricing: SizePricingMap,

    public isActive: boolean,
    public policyVersion:number,

    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {
    this.validate();
  }

  validate(): void {
    if (this.basePrice < 0) {
      throw new AppError("Base price cannot be negative");
    }

    if (this.pricePerKm <= 0) {
      throw new AppError("Price per km must be greater than zero");
    }

    for (const [size, pricing] of Object.entries(this.sizePricing)) {
      if (pricing.price < 0) {
        throw new AppError(`Invalid price for size ${size}`);
      }
    }
  }
}
