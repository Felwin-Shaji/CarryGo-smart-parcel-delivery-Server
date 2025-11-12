import { inject, injectable } from "tsyringe";
import type { ILogoutUsecase } from "../interfaces/useCase/logout.usecase.js";
import type { ITokenService } from "../interfaces/services/token-service.interface.js";
import type { IRefreshTokenRepository } from "../interfaces/repositories/auth/refreshToken.repository.js";

@injectable()
export class LogoutUsecase implements ILogoutUsecase {
    constructor(
        @inject("ITokenService") private readonly tokenService: ITokenService,
        @inject("IRefreshTokenRepository") private readonly refreshTokenRepo: IRefreshTokenRepository
    ) { }

    async execute(refreshToken: string,userId:string): Promise<void> {
        try {
            const decoded = this.tokenService.verifyRefreshToken(refreshToken);

            if (!decoded?.userId) {
                throw new Error("Invalid refresh token");
            }


            await this.refreshTokenRepo.deleteByUserId(userId);
        } catch (error) {
            console.error("LogoutUsecase error:", error);
            throw new Error("Failed to log out user");
        }
    }
}
