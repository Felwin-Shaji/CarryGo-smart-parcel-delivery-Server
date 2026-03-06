import { AppError } from "../../utils/customError";

export type ServiceType = "STANDARD" | "EXPRESS";

export class AgencyPricing {
  constructor(
    public readonly id: string | null,

    public agencyId: string,
    public serviceType: ServiceType,

    public basePrice: number,
    public pricePerKm: number,

    public pricePerKg: number,

    public isActive: boolean,
    public policyVersion: number,

    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
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

    if (this.pricePerKg <= 0) {
      throw new AppError("Price per kg must be greater than zero");
    }
  }
}