import { Role } from "../../../Infrastructure/Types/types";

export interface HubWorkersTemp {
    name: string;
    email: string;
    mobile: string; 
    otp: string;
    role: Role | "worker";
    status: "BASIC-Info" | "OTP-Verified";
    expiresAt: Date;
    _id?: string | null;
}
