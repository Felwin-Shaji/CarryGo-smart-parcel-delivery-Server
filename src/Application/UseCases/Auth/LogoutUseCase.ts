import { inject, injectable } from "tsyringe";
import { ILogoutUsecase } from "../../Interfaces/UseCases/Auth/ILogoutUseCase";
import { ITokenService } from "../../Interfaces/Services/ITokenService";
import { AppError } from "../../../Domain/Utils/customError";

import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { AUTH_MESSAGES } from "../../../Infrastructure/Constants/Messages/authMessages";


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
