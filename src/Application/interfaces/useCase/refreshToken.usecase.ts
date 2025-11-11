import type { TokenObj } from "../../../Infrastructure/Types/types.js";

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<TokenObj>;
}
