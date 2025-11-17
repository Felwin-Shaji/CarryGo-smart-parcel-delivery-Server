
export type Role = "user" | "agency" | "admin" | "hub" | "worker";


export type KYCStatus =
  | "PENDING"
  | "REGISTERED"
  | "APPROVED"
  | "REJECTED";
//   | "ACTIVE"
//   | "INACTIVE";




export interface AppJwtPayload {
    userId: string;
    email: string;
    role: Role;
}


export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    kycStatus:KYCStatus;
}

export interface TokenObj {
    accessToken: string;
    refreshToken: string;
    user?: AuthUser;
}
