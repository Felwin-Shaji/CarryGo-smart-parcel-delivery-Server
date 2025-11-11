import { inject, injectable } from "tsyringe";
import { AppError } from "../../Domain/utils/customError.js";
import { STATUS } from "../../Infrastructure/constants/statusCodes.js";
import type { TokenObj } from "../../Infrastructure/Types/types.js";
import type { ITokenService } from "../interfaces/services/token-service.interface.js";
import type { IRefreshTokenUseCase } from "../interfaces/useCase/refreshToken.usecase.js";
import type { IRefreshTokenRepository } from "../interfaces/repositories/auth/refreshToken.repository.js";
import type { IUserRepository } from "../interfaces/repositories/user/user.repository.js";


@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    constructor(
        @inject("ITokenService") private tokenService: ITokenService,
        @inject("IUserRepository") private userRepo: IUserRepository,
        @inject("IRefreshTokenRepository") private refreshTokenRepo: IRefreshTokenRepository
    ) { }

    async execute(refreshToken: string): Promise<TokenObj> {
        if (!refreshToken) throw new AppError("No refresh token found", STATUS.UNAUTHORIZED);

        const decoded = this.tokenService.verifyRefreshToken(refreshToken);
        if (!decoded) throw new AppError("Invalid refresh token", STATUS.UNAUTHORIZED);

        const { userId, email, role } = decoded;

        const storedToken = await this.refreshTokenRepo.findOne({ token: refreshToken });
        if (!storedToken) throw new AppError("Refresh token not found", STATUS.UNAUTHORIZED);

        const user = await this.userRepo.findOne({ email });
        if (!user) throw new AppError("User not found", STATUS.NOT_FOUND);

        const newAccessToken = this.tokenService.generateAccessToken({ userId, email, role });
        
        return {
            accessToken: newAccessToken,
            refreshToken, 
            user: {
                id: user.id!,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };

    }
}