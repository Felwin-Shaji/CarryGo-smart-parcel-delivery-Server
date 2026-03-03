import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError.js";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";
import type { TokenObj } from "../../../Infrastructure/Types/types.js";
import type { ITokenService } from "../../interfaces/services_Interfaces/token-service.interface.js";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import type { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository.js";
import type { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository.js";
import { IRefreshTokenUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/refreshToken.usecase.js";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository.js";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages.js";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository.js";
import { User } from "../../../Domain/Entities/User.js";
import { Admin } from "../../../Domain/Entities/admin.js";
import { Agency } from "../../../Domain/Entities/Agency/Agency.js";
import { Hub } from "../../../Domain/Entities/Hub/Hub.js";
import { HubWorker } from "../../../Domain/Entities/Worker/Worker.js";


@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    constructor(
        @inject("ITokenService") private _tokenService: ITokenService,
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAdminRepository") private _adminRepo: IAdminRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IHubWorkerRepository") private _workerRepo: IHubWorkerRepository,
    ) { }

    async execute(refreshToken: string): Promise<TokenObj> {
        if (!refreshToken) throw new AppError(AUTH_MESSAGES.REFRESH_TOKEN_INVALID, STATUS.UNAUTHORIZED);

        const decoded = this._tokenService.verifyRefreshToken(refreshToken);
        if (!decoded) throw new AppError(AUTH_MESSAGES.REFRESH_TOKEN_NOT_FOUND, STATUS.UNAUTHORIZED);

        const { userId, email, role, tokenVersion } = decoded;

        let user: User | Admin | Agency | Hub | HubWorker | null = null
        if (role === "user") user = await this._userRepo.findOne({ email });
        if (role === "admin") user = await this._adminRepo.findOne({ email });
        if (role === "agency") user = await this._agencyRepo.findOne({ email });
        if (role === "hub") user = await this._hubRepo.findOneHub({ email });
        if (role === "worker") user = await this._workerRepo.findOne({ email });

        if (!user) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND);
        if (user.isBlocked) throw new AppError(AUTH_MESSAGES.USER_BLOCKED, STATUS.UNAUTHORIZED);
        if (user.tokenVersion !== decoded.tokenVersion) {
            throw new AppError(AUTH_MESSAGES.TOKEN_INVALID, STATUS.UNAUTHORIZED);
        }

        const newAccessToken = this._tokenService.generateAccessToken({ userId, email, role, tokenVersion });

        return {
            accessToken: newAccessToken,
            refreshToken,
            user: {
                id: user.id!,
                name: user.name,
                email: user.email,
                role: user.role,
                kycStatus: user.kycStatus,
                tokenVersion: user.tokenVersion
            },
        };

    };
}