export interface ITokenService {
  generateAccessToken(payload: object): string;
  generateRefreshToken(payload: object): string;

  verifyAccessToken(token: string):void;
  verifyRefreshToken(token: string): void;
}