import { TransportMode, TravelRequest } from "../../../Domain/Entities/User/TravelRequest";
import { IDType } from "../../../Domain/Entities/Worker/WorkerKyc";
import { AddressResponseDTO, BookingAddressDTO } from "./Booking.dto";
import { BaseUserResponseDTO } from "./user.dto";

export interface SubmitTravelerKycRequestDTO {
  idType: IDType;
  idNumber: string;
}

export type TravelerRequestAddressDTO = AddressResponseDTO;


export interface CreateTravelRequestDTO {
  startAddress: TravelerRequestAddressDTO;
  endAddress: TravelerRequestAddressDTO;

  departureAt: string;
  arrivalAt?: string;

  capacityKg: number;

  totalVolumeCm3: number;

  allowedPackageDimensions: {
    maxLengthCm: number;
    maxWidthCm: number;
    maxHeightCm: number;
  };

  pricePerKg?: number;

  modeOfTransport: TransportMode;

  description?: string;
}

export interface TravelerRequestFilterDTO {
  page: number;
  limit: number;
  status: string;
}

export interface PaginatedTravelRequestResponceDTO {
  data: TravelRequest[];
  totalPages: number;
  totalItems: number;
}


export interface TripOrderResponseDTO {
  id: string;
  customerDetails: Omit<BaseUserResponseDTO, "isBlocked" | "kycStatus" | "createdAt">;
  pickupAddress: BookingAddressDTO;
  deliveryAddress: BookingAddressDTO;
  weightKg: number;
  amount: number;
  platformFee:number;
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

  totalVolumeCm3: number;
  remainingVolumeCm3: number;

  allowedPackageDimensions: {
    maxLengthCm: number;
    maxWidthCm: number;
    maxHeightCm: number;
  };

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