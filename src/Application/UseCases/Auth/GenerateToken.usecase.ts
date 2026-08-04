import { inject, injectable } from "tsyringe";
import type { ITokenService } from "../../Interfaces/Services/token-service.interface.js";
import type { Role, TokenObj } from "../../../Infrastructure/Types/types.js";
import { IGenerateTokenUseCase } from "../../Interfaces/UseCases/Auth/GenerateToken.usecase.js";


@injectable()
export class GenerateTokenUseCase implements IGenerateTokenUseCase {
  constructor(
    @inject("ITokenService") private _tokenService: ITokenService,
  ) { }

  async execute(userId: string, email: string, role: Role, tokenVersion: number): Promise<TokenObj> {
    const payload = { userId, email, role, tokenVersion };

    const accessToken = this._tokenService.generateAccessToken(payload);
    const refreshToken = this._tokenService.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }
}
