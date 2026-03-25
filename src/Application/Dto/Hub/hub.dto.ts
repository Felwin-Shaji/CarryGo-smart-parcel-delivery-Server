import { WorkerRole } from "@/Domain/Entities/Worker/Worker";
import { KYCStatus, Role } from "../../../Infrastructure/Types/types";

export interface GetHubsDTO {
    page: number;
    limit: number;
    search: string;
    sortBy: string;
    sortOrder: "desc" | "asc";
    blocked?: boolean | null;
    kycStatus?: string;
    startDate?: string;
    endDate?: string;
};

export interface HubResponseDTO {
    id: string;
    name: string;
    email: string;
    mobile: string;
    isBlocked: boolean;
    kycStatus: string;
    createdAt: Date;
    address: {
        addressLine1: string;
        city: string;
        state: string;
        pincode: string;
    }
};

export interface GetHubsResponseDTO {
    data: HubResponseDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};



/**
 * Hub add new worker request
 */
export interface AddWorkerTempRequestDTO {
    hubId: string
    name: string,
    email: string,
    mobile: string,
    role: Role,
    workerRole:WorkerRole
}

export interface AddWorkerTempResponseDTO {
    email: string;
    expiresAt: Date;
    tempWorkerId: string;
}

/**
 * updateAgencyKycStatus Dtos
 */
export interface updateHubKycStatusDTO {
    status: KYCStatus,
    reason?: string
};