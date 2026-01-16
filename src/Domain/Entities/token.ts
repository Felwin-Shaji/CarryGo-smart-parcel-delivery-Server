import type { Role } from "../../Infrastructure/Types/types.js";

export interface IResetPasswordTokenModel {
    id?: string | null
    userId: string;
    token: string;
    role: Role;
    createdAt?: Date;
    expiresAt?: Date;
    expiresInSeconds?: number;
};

