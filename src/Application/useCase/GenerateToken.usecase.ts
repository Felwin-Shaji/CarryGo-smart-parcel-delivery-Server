import { inject, injectable } from "tsyringe";
import type { ITokenService } from "../interfaces/services/token-service.interface.js";
import type { IRefreshTokenRepository } from "../interfaces/repositories/auth/refreshToken.repository.js";
import type { Role } from "../../Infrastructure/Types/types.js";
import type { IGenerateTokenUseCase } from "../interfaces/useCase/GenerateToken.usecase.js";

@injectable()
export class GenerateTokenUseCase implements IGenerateTokenUseCase {
  constructor(
    @inject("ITokenService") private tokenService: ITokenService,
    @inject("IRefreshTokenRepository") private refreshTokenRepo: IRefreshTokenRepository
  ) { }

  async execute(userId: string, email: string, role: Role) {
    const payload = { userId, email, role };

    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    await this.refreshTokenRepo.save({
      userId,
      token: refreshToken,
      role,
      createdAt: new Date(),
      expiresInSeconds: 7 * 24 * 60 * 60
    });

    

    return { accessToken, refreshToken };
  }
}
