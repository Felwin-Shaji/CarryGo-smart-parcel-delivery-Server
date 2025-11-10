import type { Role } from "../../../../Infrastructure/Types/types.js";
import type { IBaseRepository } from "../base.repository.js";

export interface ITokenModel {   //entity or here only
    id?:string | null
    userId: string;
    token: string;
    role: Role;
    createdAt?: Date;
    expiresAt?: Date;
    expiresInSeconds?: number; 
}

export interface IRefreshTokenRepository extends IBaseRepository<ITokenModel> {
    saveToken(data: ITokenModel): Promise<ITokenModel>;
    deleteByUserId(userId: string): Promise<void>;
}