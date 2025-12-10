import type { Role } from "../../Infrastructure/Types/types.js";

export interface ITokenModel {   //entity or here only
    _id?:string | null
    userId: string;
    token: string;
    role: Role;
    createdAt?: Date;
    expiresAt?: Date;
    expiresInSeconds?: number; 
}
