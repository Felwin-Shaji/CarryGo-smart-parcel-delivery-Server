import { TokenObj } from "../../../../Infrastructure/Types/CommonTypes";

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<TokenObj>;
}
