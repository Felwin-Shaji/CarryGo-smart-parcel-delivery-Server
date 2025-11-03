import type { Role } from "../../Infrastructure/Types/types.js";

export interface IOtpModel {
    id?: string | null;
    name: string;
    email: string;
    mobile?: string;
    password?: string;
    otp: string;
    role:Role;
    createdAt?: Date;
};
