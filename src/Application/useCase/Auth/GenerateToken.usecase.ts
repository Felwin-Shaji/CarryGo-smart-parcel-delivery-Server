import { inject, injectable } from "tsyringe";
import type { ITokenService } from "../../interfaces/services_Interfaces/token-service.interface.js";
import type { IRefreshTokenRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/refreshToken.repository.js";
import type { Role, TokenObj } from "../../../Infrastructure/Types/types.js";
import { IGenerateTokenUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/GenerateToken.usecase.js";


@injectable()
export class GenerateTokenUseCase implements IGenerateTokenUseCase {
  constructor(
    @inject("ITokenService") private _tokenService: ITokenService,
    @inject("IRefreshTokenRepository") private _refreshTokenRepo: IRefreshTokenRepository
  ) { }

  async execute(userId: string, email: string, role: Role): Promise<TokenObj>  {
    const payload = { userId, email, role };

    const accessToken = this._tokenService.generateAccessToken(payload);
    const refreshToken = this._tokenService.generateRefreshToken(payload);

    await this._refreshTokenRepo.save({
      userId,
      token: refreshToken,
      role,
      createdAt: new Date(),
      expiresInSeconds: 7 * 24 * 60 * 60
    });

    

    return { accessToken, refreshToken };
  }
}
