import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import type { ITokenService } from "../../Application/interfaces/services/token-service.interface.js";
import type { AppJwtPayload } from "../Types/types.js";
dotenv.config()

export class TokenService implements ITokenService {
    private readonly accessSecret = process.env.ACCESS_TOKEN_SECRET!;
    private readonly refreshSecret = process.env.REFRESH_TOKEN_SECRET!;

    generateAccessToken(payload: object): string {
        let token = jwt.sign(payload, this.accessSecret, { expiresIn: "15m" })
        console.log(token)
        return token
    };

    generateRefreshToken(payload: object): string {
        let token = jwt.sign(payload, this.refreshSecret, { expiresIn: "7d" })
        console.log(token)
        return token
    };

    verifyAccessToken(token: string): AppJwtPayload | null {
        let decoded = jwt.verify(token, this.accessSecret)
        console.log(decoded)
        return decoded as AppJwtPayload
    };

    verifyRefreshToken(token: string): AppJwtPayload | null {
        let decoded = jwt.verify(token, this.refreshSecret)
        console.log(decoded)
        return decoded as AppJwtPayload
    }
}