import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import type { TokenObj } from "../../../Infrastructure/Types/CommonTypes";
import type { ITokenService } from "../../Interfaces/Services/ITokenService";
import type { IUserRepository } from "../../Interfaces/Repositories/User/IUserRepository";
import type { IAdminRepository } from "../../Interfaces/Repositories/Admin/IAdminRepository";
import type { IAgencyRepository } from "../../Interfaces/Repositories/Agency/IAgencyRepository";
import { IRefreshTokenUseCase } from "../../Interfaces/UseCases/Auth/IRefreshTokenUseCase";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/IHubRepository";
import { AUTH_MESSAGES } from "../../../Infrastructure/Constants/Messages/authMessages";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/IHubWorkerRepository";
import { User } from "../../../Domain/Entities/User";
import { Admin } from "../../../Domain/Entities/Admin";
import { Agency } from "../../../Domain/Entities/Agency/Agency";
import { Hub } from "../../../Domain/Entities/Hub/Hub";
import { HubWorker } from "../../../Domain/Entities/Worker/Worker";


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

        let decoded;
        try {
            decoded = this._tokenService.verifyRefreshToken(refreshToken);
        } catch (error) {
            throw new AppError(AUTH_MESSAGES.REFRESH_TOKEN_INVALID, STATUS.UNAUTHORIZED);
        }

        if (!decoded) throw new AppError(AUTH_MESSAGES.REFRESH_TOKEN_NOT_FOUND, STATUS.UNAUTHORIZED);

        const { userId, email, role, tokenVersion } = decoded;

        let user: User | Admin | Agency | Hub | HubWorker | null = null
        if (role === "user") user = await this._userRepo.findOne({ email });
        if (role === "admin") user = await this._adminRepo.findOne({ email });
        if (role === "agency") user = await this._agencyRepo.findOne({ email });
        if (role === "hub") user = await this._hubRepo.findOne({ email });
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