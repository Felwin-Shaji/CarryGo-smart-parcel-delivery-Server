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


export interface TripOrderResponseDTO {
  id: string;
  customerName: string;
  pickupCity: string;
  deliveryCity: string;
  weightKg: number;
  amount: number;
  status: string;
}

export interface TripEarningsResponseDTO {
  total: number;
  completed: number;
  pending: number;
}

export interface TripDetailsResponseDTO {
  id: string;

  startCity: string;
  endCity: string;

  departureAt: string;
  arrivalAt?: string;

  modeOfTransport: string;

  capacityKg: number;
  remainingCapacityKg: number;

  allowedPackageSizes: string[];

  description?: string;

  status: string;

  createdAt: string;

  orders: TripOrderResponseDTO[];

  earnings: TripEarningsResponseDTO;

  stats: {
    totalOrders: number;
    deliveredOrders: number;
    activeOrders: number;
    cancelledOrders: number;
  };
}
