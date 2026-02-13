import { PackageSizeType } from "../../../Infrastructure/Types/types";
import { AppError } from "../../utils/customError";

export type TravelRequestStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "ACTIVE"
  | "PARTIALLY_BOOKED"
  | "FULLY_BOOKED"
  | "COMPLETED"
  | "CANCELLED";

export type TransportMode =
  | "FLIGHT"
  | "TRAIN"
  | "CAR"
  | "BUS";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export class TravelRequest {
  constructor(
    public readonly id: string | null,

    public travelerId: string,

    public startLocation: GeoPoint,
    public startAddress: string,

    public endLocation: GeoPoint,
    public endAddress: string,

    public departureAt: Date,
    public arrivalAt: Date | null,

    public capacityKg: number,
    public remainingCapacityKg: number,
    public allowedPackageSizes: PackageSizeType[],

    public pricePerKg: number | null,

    public modeOfTransport: TransportMode,

    public description: string | null,

    public status: TravelRequestStatus,

    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {

    if (this.capacityKg <= 0) {
      throw new AppError("Capacity must be greater than 0");
    }

    if (this.remainingCapacityKg > this.capacityKg) {
      throw new AppError("Remaining capacity cannot exceed total capacity");
    }

    if (this.departureAt < new Date()) {
      throw new AppError("Departure date must be in the future");
    }

    if (this.pricePerKg !== null && this.pricePerKg <= 0) {
      throw new AppError("Price per kg must be greater than 0");
    }
  }

  public reduceCapacity(weightKg: number): void {
    if (weightKg > this.remainingCapacityKg) {
      throw new AppError("Not enough remaining capacity");
    }

    this.remainingCapacityKg -= weightKg;

    if (this.remainingCapacityKg === 0) {
      this.status = "FULLY_BOOKED";
    } else {
      this.status = "PARTIALLY_BOOKED";
    }
  }

  public restoreCapacity(weightKg: number): void {
    this.remainingCapacityKg += weightKg;

    if (this.remainingCapacityKg > this.capacityKg) {
      this.remainingCapacityKg = this.capacityKg;
    }

    this.status = "ACTIVE";
  }

  public cancel(): void {
    if (this.status === "COMPLETED") {
      throw new AppError("Completed travel request cannot be cancelled");
    }

    this.status = "CANCELLED";
  }
}
