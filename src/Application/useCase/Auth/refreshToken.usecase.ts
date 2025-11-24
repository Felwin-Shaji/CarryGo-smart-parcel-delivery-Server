import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError.js";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";
import type { TokenObj } from "../../../Infrastructure/Types/types.js";
import type { ITokenService } from "../../interfaces/services_Interfaces/token-service.interface.js";
import type { IRefreshTokenRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/refreshToken.repository.js";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import type { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository.js";
import type { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository.js";
import { IRefreshTokenUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/refreshToken.usecase.js";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository.js";


@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    constructor(
        @inject("ITokenService") private _tokenService: ITokenService,
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAdminRepository") private _adminRepo:IAdminRepository,
        @inject("IAgencyRepository") private _agencyRepo:IAgencyRepository,
        @inject("IHubRepository") private _hubRepo:IHubRepository,
        @inject("IRefreshTokenRepository") private refreshTokenRepo: IRefreshTokenRepository
    ) { }

    async execute(refreshToken: string): Promise<TokenObj> {
        if (!refreshToken) throw new AppError("No refresh token found", STATUS.UNAUTHORIZED);

        const decoded = this._tokenService.verifyRefreshToken(refreshToken);
        if (!decoded) throw new AppError("Invalid refresh token", STATUS.UNAUTHORIZED);

        const { userId, email, role } = decoded;

        const storedToken = await this.refreshTokenRepo.findOne({ token: refreshToken });
        if (!storedToken) throw new AppError("Refresh token not found", STATUS.UNAUTHORIZED);

        let user
        if (role === "user")  user = await this._userRepo.findOne({ email });
        if (role === "admin") user = await this._adminRepo.findOne({email});
        if(role === "agency") user = await this._agencyRepo.findOne({email});
        if(role === "hub") user = await this._hubRepo.findOne({email});
        if (!user) throw new AppError("User not found", STATUS.NOT_FOUND);

        const newAccessToken = this._tokenService.generateAccessToken({ userId, email, role });
        
        return {
            accessToken: newAccessToken,
            refreshToken, 
            user: {
                id: user.id!,
                name: user.name,
                email: user.email,
                role: user.role,
                kycStatus:user.kycStatus,
            },
        };

    };
}