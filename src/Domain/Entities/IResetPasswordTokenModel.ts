import type { Role } from "../../Infrastructure/Types/CommonTypes";

export interface IResetPasswordTokenModel {
    id?: string | null
    userId: string;
    token: string;
    role: Role;
    createdAt?: Date;
    expiresAt?: Date;
    expiresInSeconds?: number;
};

