
export type Role = "user" | "agency" | "admin" | "hub" | "worker";

export type KYCStatus = "PENDING" | "REGISTERED" | "APPROVED" | "REJECTED";

export interface AppJwtPayload {
    userId: string;
    email: string;
    role: Role;
}

export interface AuthUserDTO {
    id: string;
    name: string;
    email: string;
    role: Role;
    kycStatus: KYCStatus;
}

export interface TokenObj {
    accessToken: string;
    refreshToken: string;
    user?: AuthUserDTO;
}
