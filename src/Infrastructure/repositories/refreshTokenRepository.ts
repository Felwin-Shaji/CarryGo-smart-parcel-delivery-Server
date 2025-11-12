import type { ClientSession } from "mongoose";
import type { IRefreshTokenRepository } from "../../Application/interfaces/repositories/auth/refreshToken.repository.js";
import { RefreshTokenModel } from "../database/models/refreshToken.js";
import { BaseRepository } from "./baseRepositories.js";
import type { ITokenModel } from "../../Domain/Entities/token.js";

export class RefreshTokenRepository extends BaseRepository<ITokenModel> implements IRefreshTokenRepository {

    constructor() {
        super(RefreshTokenModel)
    };

    async saveToken(data: ITokenModel, session?: ClientSession): Promise<ITokenModel> {
        const expiresAt = new Date(Date.now() + (data.expiresInSeconds ?? 7 * 24 * 60 * 60) * 1000)

        await RefreshTokenModel.deleteMany({ userId: data.userId });


        const newToken = new RefreshTokenModel(data);
        if (session) await newToken.save({ session });
        return newToken

    }

    async deleteByUserId(userId: string): Promise<void> {
        await RefreshTokenModel.deleteMany({ userId });
    }
} 