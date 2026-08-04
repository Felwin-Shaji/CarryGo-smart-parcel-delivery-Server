import { TokenObj } from "../../../../Infrastructure/Types/types";

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<TokenObj>;
}
