import { inject, injectable } from "tsyringe";
import type { ITokenService } from "../../interfaces/services_Interfaces/token-service.interface.js";
import type { IRefreshTokenRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/refreshToken.repository.js";
import type { Role, TokenObj } from "../../../Infrastructure/Types/types.js";
import { IGenerateTokenUseCase } from "../../interfaces/useCase_Interfaces/Auth/GenerateToken.usecase.js";


@injectable()
export class GenerateTokenUseCase implements IGenerateTokenUseCase {
  constructor(
    @inject("ITokenService") private tokenService: ITokenService,
    @inject("IRefreshTokenRepository") private refreshTokenRepo: IRefreshTokenRepository
  ) { }

  async execute(userId: string, email: string, role: Role): Promise<TokenObj>  {
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
