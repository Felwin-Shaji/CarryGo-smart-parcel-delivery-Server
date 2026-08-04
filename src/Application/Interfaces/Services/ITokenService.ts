import type { AppJwtPayload } from "../../../Infrastructure/Types/types.js";

export interface ITokenService {
  generateAccessToken(payload: AppJwtPayload): string;
  generateRefreshToken(payload: AppJwtPayload): string;

  verifyAccessToken(token: string): AppJwtPayload | null;
  verifyRefreshToken(token: string): AppJwtPayload | null;

  generateForgotPasswordToken(payload: object): string;
  verifyForgotPasswordToken(token: string):AppJwtPayload | null;
}