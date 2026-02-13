import { TransportMode } from "../../../Domain/Entities/User/TravelRequest";
import { IDType } from "../../../Domain/Entities/Worker/WorkerKyc";
import { PackageSizeType } from "../../../Infrastructure/Types/types";

export interface SubmitTravelerKycRequestDTO {
    idType: IDType;
    idNumber: string;
}

export interface CreateTravelRequestDTO {
  startAddressId: string;
  endAddressId: string;

  departureAt: string;
  arrivalAt?: string;

  capacityKg: number;
  remainingCapacityKg: number;

  allowedPackageSizes: PackageSizeType[];
  modeOfTransport: TransportMode;

  description?: string;
}
