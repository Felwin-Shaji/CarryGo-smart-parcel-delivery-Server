import { WorkerRole, WorkingStatus } from "@/Domain/Entities/Worker/Worker";
import { IDType } from "../../../Domain/Entities/Worker/WorkerKyc";
import { KYCStatus, Role } from "../../../Infrastructure/Types/types";
import { userKycResponseDTO } from "../User/user.dto";
import { ShipmentParcel, ShipmentParcelStatus } from "@/Domain/Entities/Logistics/ShipmentParcel";

export interface WorkerResponseDTO {
  id: string;
  hubId: string;
  name: string;
  email: string;
  mobile: string;
  role: Role;
  workerRole: WorkerRole;
  workingStatus: WorkingStatus;
  kycStatus: KYCStatus;
  createdAt: Date;
};

export interface WorkerKYCResponseDTO {
  id: string;

  subjectId: string;
  subjectType: Role;
  idType: IDType;

  documentUrl: string;
  selfieUrl: string;

  status: KYCStatus;

  createdAt: Date;
  reviewedAt: Date | null;
};

/**
 * get Workers Dtos
 */

export interface GetWorkersDTO {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortOrder: "desc" | "asc";
  blocked?: boolean | null;
  kycStatus?: string;
  startDate?: string;
  endDate?: string;
}

export interface GetHubWorkersResponseDTO {
  data: WorkerResponseDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface HubWorkerWithKYCResponseDTO extends WorkerResponseDTO {
  kyc: WorkerKYCResponseDTO | null;
}

export interface GetWorkerOverviewResponseDTO {
  id: string;
  name: string;
  email: string;
  mobile?: string;

  role: Role;
  workerRole: WorkerRole;
  workingStatus: WorkingStatus;

  kycStatus: KYCStatus;
  walletBalance: number;
  isBlocked: boolean;

  createdAt: Date;

  kyc: userKycResponseDTO | null;
}

export interface GetWorkerKycResponseDTO {
  idType: IDType;
  idNumber: string;
  documentUrl: string;
  selfieUrl: string;
  rejectionReason?: string | null;
}

export interface ReSubmitWorkerKycPayloadDTO {
  idType: IDType;
  idNumber: string;
}

export type UpdateWorkerKycStatusDTO = {
  status: "APPROVED" | "REJECTED";
  rejectReason?: string;
};

export type GetWorkerParcelsDTO = {
  page: number;
  limit: number;
  status?: ShipmentParcelStatus;
  fromDate?: string;
  toDate?: string;
}

export type WorkerParcelItemDTO = {
  id: string;
  shipmentId: string;
  bookingId: string;

  status: ShipmentParcelStatus;

  loadedAt: Date | null;
  unloadedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;

  shipmentType: string;
};

export type GetWorkerParcelsResponseDTO = {
  data: WorkerParcelItemDTO[];
  total: number;
  page: number;
  totalPages: number;
};

export interface GetWorkerDashboardResponseDTO {
  worker: {
    id: string;
    name: string;
    workerRole: WorkerRole;
  };

  summary: {
    completedShipmentCount: number;
    completedParcelCount: number;
    todayShipmentCount: number;
    todayParcelHandledCount: number;
    pendingParcelCount: number;
    completionRate: number;
  };

  activeShipment: {
    id: string;
    type: string;
    status: string;
    fromHubId: string;
    toHubId: string;
    parcelCount: number;
  } | null;
};

// GET /worker/graph
export interface GetWorkerGraphRequestDTO {
  fromDate?: string;
  toDate?: string;
  status?: string;
};

export interface WorkerGraphPointDTO {
  date: string;
  count: number;
}

export interface GetWorkerGraphResponseDTO {
  series: WorkerGraphPointDTO[];
}