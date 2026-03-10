import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AppError } from "../../utils/customError";
import { PackageDetails } from "../Booking/Booking";

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
  | "BUS"
  | "BIKE";

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
    public startPincode: string,

    public endLocation: GeoPoint,
    public endAddress: string,
    public endPincode: string,

    public departureAt: Date,
    public arrivalAt: Date | null,

    public capacityKg: number,
    public remainingCapacityKg: number,

    // NEW
    public totalVolumeCm3: number,
    public remainingVolumeCm3: number,

    public allowedPackageDimensions: {
      maxLengthCm: number;
      maxWidthCm: number;
      maxHeightCm: number;
    },

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
      throw new AppError("Capacity must be greater than 0",STATUS.BAD_REQUEST);
    }

    if (this.remainingCapacityKg > this.capacityKg) {
      throw new AppError("Remaining capacity cannot exceed total capacity",STATUS.BAD_REQUEST);
    }

    if (this.totalVolumeCm3 <= 0) {
      throw new AppError("Volume must be greater than 0",STATUS.BAD_REQUEST);
    }

    if (this.remainingVolumeCm3 > this.totalVolumeCm3) {
      throw new AppError("Remaining volume cannot exceed total volume",STATUS.BAD_REQUEST);
    }

    if (this.pricePerKg !== null && this.pricePerKg <= 0) {
      throw new AppError("Price per kg must be greater than 0",STATUS.BAD_REQUEST);
    }
  }

  private calculatePackageVolume(pkg: PackageDetails): number {
    const dims = pkg.dimensions;

    return (
      dims.lengthCm *
      dims.widthCm *
      dims.heightCm
    );
  }

  public canAcceptPackage(pkg: PackageDetails): boolean {
    const dims = pkg.dimensions;
    const volume = this.calculatePackageVolume(pkg);

    if (pkg.weightKg > this.remainingCapacityKg) {
      return false;
    }

    if (volume > this.remainingVolumeCm3) {
      return false;
    }

    if (
      dims.lengthCm > this.allowedPackageDimensions.maxLengthCm ||
      dims.widthCm > this.allowedPackageDimensions.maxWidthCm ||
      dims.heightCm > this.allowedPackageDimensions.maxHeightCm
    ) {
      return false;
    }

    return true;
  }

  public reduceCapacity(pkg: PackageDetails): void {
    const volume = this.calculatePackageVolume(pkg);

    if (pkg.weightKg > this.remainingCapacityKg) {
      throw new AppError("Not enough weight capacity",STATUS.BAD_REQUEST);
    }

    if (volume > this.remainingVolumeCm3) {
      throw new AppError("Not enough space capacity",STATUS.BAD_REQUEST);
    }

    this.remainingCapacityKg -= pkg.weightKg;
    this.remainingVolumeCm3 -= volume;

    if (
      this.remainingCapacityKg === 0 ||
      this.remainingVolumeCm3 === 0
    ) {
      this.status = "FULLY_BOOKED";
    } else {
      this.status = "PARTIALLY_BOOKED";
    }
  }

  public restoreCapacity(pkg: PackageDetails): void {
    const volume = this.calculatePackageVolume(pkg);

    this.remainingCapacityKg += pkg.weightKg;
    this.remainingVolumeCm3 += volume;

    if (this.remainingCapacityKg > this.capacityKg) {
      this.remainingCapacityKg = this.capacityKg;
    }

    if (this.remainingVolumeCm3 > this.totalVolumeCm3) {
      this.remainingVolumeCm3 = this.totalVolumeCm3;
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