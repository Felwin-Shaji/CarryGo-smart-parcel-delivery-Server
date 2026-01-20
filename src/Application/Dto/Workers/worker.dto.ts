import { IDType } from "../../../Domain/Entities/Worker/WorkerKyc";
import { KYCStatus, Role } from "../../../Infrastructure/Types/types";

export interface WorkerResponseDTO {
    hubId: string;
    name: string;
    email: string;
    mobile: string;
    role: Role;
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
