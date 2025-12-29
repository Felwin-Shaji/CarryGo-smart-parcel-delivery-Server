import { inject, injectable } from "tsyringe";
import { ILogoutUsecase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/logout.usecase";
import { ITokenService } from "../../interfaces/services_Interfaces/token-service.interface";
import { IRefreshTokenRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/refreshToken.repository";
import { AppError } from "../../../Domain/utils/customError";

import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";


@injectable()
export class LogoutUsecase implements ILogoutUsecase {
    constructor(
        @inject("ITokenService") private readonly _tokenService: ITokenService,
        @inject("IRefreshTokenRepository") private readonly _refreshTokenRepo: IRefreshTokenRepository
    ) { }

    async execute(refreshToken: string, userId: string): Promise<void> {
        const decoded = this._tokenService.verifyRefreshToken(refreshToken);

        if (!decoded?.userId) throw new AppError(AUTH_MESSAGES.REFRESH_TOKEN_INVALID, STATUS.UNAUTHORIZED);

        await this._refreshTokenRepo.deleteByUserId(userId);

    }
}
