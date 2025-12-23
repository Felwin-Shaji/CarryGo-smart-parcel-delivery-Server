import type { ITokenModel } from "../../../../Domain/Entities/token.js";
import type { IBaseRepository } from "../base.repository.js";


export interface IRefreshTokenRepository extends IBaseRepository<ITokenModel> {
    saveToken(data: ITokenModel): Promise<ITokenModel>;
    deleteByUserId(userId: string): Promise<void>;
}