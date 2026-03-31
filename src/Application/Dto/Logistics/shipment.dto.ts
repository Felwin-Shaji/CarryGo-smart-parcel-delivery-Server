import { ShipmentStatus, ShipmentType } from "@/Domain/Entities/Logistics/HubShipment";

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

export interface GetShipmentsResponseDTO {
  shipments: ShipmentListItemDTO[];

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}