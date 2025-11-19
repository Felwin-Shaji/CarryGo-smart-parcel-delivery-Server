import { inject, injectable } from "tsyringe";
import { ILogoutUsecase } from "../../interfaces/useCase_Interfaces/Auth/logout.usecase";
import { ITokenService } from "../../interfaces/services_Interfaces/token-service.interface";
import { IRefreshTokenRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/refreshToken.repository";


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
