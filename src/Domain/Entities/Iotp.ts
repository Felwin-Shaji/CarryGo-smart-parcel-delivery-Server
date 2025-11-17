import type { Role } from "../../Infrastructure/Types/types.js";

export interface IOtpModel {
    id?: string | null;
    name: string;
    email: string;
    mobile?: string | null;
    password?: string | null;
    otp: string;
    role: Role;
    expiresAt: Date;
};
