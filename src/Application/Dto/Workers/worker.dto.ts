import { KYCStatus, Role } from "../../../Infrastructure/Types/types";

export interface WorkerResponseDTO {
    hubId: string;
    name: string;
    email: string;
    mobile: string;
    role: Role;
    kycStatus:KYCStatus;
    createdAt: Date;
}
