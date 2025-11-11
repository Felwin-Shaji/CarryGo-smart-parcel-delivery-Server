import type { AppJwtPayload } from "../../../Infrastructure/Types/types.js";

export interface ITokenService {
  generateAccessToken(payload: object): string;
  generateRefreshToken(payload: object): string;

  verifyAccessToken(token: string): AppJwtPayload | null;
  verifyRefreshToken(token: string): AppJwtPayload | null;
}