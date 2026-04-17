import { HubShipment, ShipmentStatus, ShipmentType } from "@/Domain/Entities/Logistics/HubShipment";
import { ShipmentParcelStatus } from "@/Domain/Entities/Logistics/ShipmentParcel";

export interface GetShipmentsDTO {
  type?: ShipmentType;

  status?: ShipmentStatus;

  workerId?: string;

  search?: string;

  fromDate?: string;
  toDate?: string;

  page?: number;
  limit?: number;
}

export type GetWorkerShipmentDTO = Omit<GetShipmentsDTO, "workerId">;


export interface ShipmentListItemDTO {
  id: string;

  type: ShipmentType;
  status?: ShipmentStatus;

  segmentId: string | null;

  fromHubId: string | null;
  toHubId: string | null;

  assignedWorkerId: string | null;
  assignedWorkerName: string | null;

  vehicleNumber: string | null;

  capacity: number | null;
  parcelCount: number;

  estimatedDispatchAt: Date | null;
  departedAt: Date | null;
  arrivedAt: Date | null;

  createdAt: Date;
}

export type HubShipmentWithWorker = HubShipment & {
  assignedWorkerName?: string;
};

export interface GetShipmentsResponseDTO {
  shipments: ShipmentListItemDTO[];

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// DTOs/ShipmentDetailsDTO.ts

export interface ShipmentParcelDTO {
  id: string;
  bookingId: string;
  bookingTrackId: string;
  customerName?: string;
  address?: string;
  status: ShipmentParcelStatus;
  loadedAt: string;
  unloadedAt: string | null;
}

export interface ShipmentDetailsDTO {
  id: string;

  type: string;
  status: string;

  fromHubName?: string;
  toHubName?: string;

  assignedWorker?: {
    id: string;
    name: string;
    mobile?: string;
  };

  capacity: number | null;
  parcelCount: number;

  estimatedDispatchAt: Date | null;

  parcels: ShipmentParcelDTO[];

  createdAt: Date;
}

export interface ShipmentParcelsPaginatedDTO {
  shipmentDetails: ShipmentDetailsDTO;

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}


export interface UpdateHubShipmentDTO {
  workerId: string;
  capacity: number;
  estimatedDispatchAt: string;
}

export type WorkerShipmentListItemDTO = Pick<
  ShipmentListItemDTO,
  | "id"
  | "type"
  | "status"
  | "parcelCount"
  | "capacity"
  | "createdAt"
  | "estimatedDispatchAt"
  | "departedAt"
  | "arrivedAt"
>;

export type WorkerShipmentDetails = {
  id: string;
  type: ShipmentType;
  status: ShipmentStatus;

  parcelCount: number;
  capacity: number | null;

  createdAt: string;

  parcels: ShipmentParcelDTO[]

}


