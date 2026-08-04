import { inject, injectable } from "tsyringe";
import { ILogoutUsecase } from "../../Interfaces/UseCases/Auth/logout.usecase";
import { ITokenService } from "../../Interfaces/Services/token-service.interface";
import { AppError } from "../../../Domain/Utils/customError";

import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";


@injectable()
export class LogoutUsecase implements ILogoutUsecase {
    constructor(
        @inject("ITokenService") private readonly _tokenService: ITokenService,
    ) { }

    async execute(refreshToken: string): Promise<void> {
        const decoded = this._tokenService.verifyRefreshToken(refreshToken);

        if (!decoded?.userId)
            throw new AppError(AUTH_MESSAGES.REFRESH_TOKEN_INVALID, STATUS.UNAUTHORIZED);
    }
}
