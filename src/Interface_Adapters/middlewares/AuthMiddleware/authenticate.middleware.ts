import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TokenService } from "../../../Infrastructure/services/token.service";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AppError } from "../../../Domain/utils/customError";
import type { Role } from "../../../Infrastructure/Types/types";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";
import { IValidateSessionUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/IValidateSessionUseCase";


declare module "express" {
  export interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
      tokenVersion: number;
    };
  }
}

export const authenticate = (allowedRoles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenService = container.resolve(TokenService);
      const validateSession = container.resolve<IValidateSessionUseCase>("IValidateSessionUseCase");

      const cookies = req.cookies;
      const url = req.baseUrl;

      let accessToken: string | undefined;

      if (url.startsWith("/api/user")) accessToken = cookies?.useraccessTokenName;
      else if (url.startsWith("/api/agency")) accessToken = cookies?.agencyaccessTokenName;
      else if (url.startsWith("/api/admin")) accessToken = cookies?.adminaccessTokenName;
      else if (url.startsWith("/api/hub")) accessToken = cookies?.hubaccessTokenName;
      else if (url.startsWith("/api/worker")) accessToken = cookies?.workeraccessTokenName;



      if (!accessToken) throw new AppError(AUTH_MESSAGES.TOKEN_MISSING, STATUS.UNAUTHORIZED);

      const decoded = tokenService.verifyAccessToken(accessToken);
      if (!decoded) throw new AppError(AUTH_MESSAGES.TOKEN_INVALID, STATUS.UNAUTHORIZED);

      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        console.log(decoded)
        throw new AppError(AUTH_MESSAGES.ROLE_NOT_ALLOWED, STATUS.FORBIDDEN);
      }

      await validateSession.execute({
        userId: decoded.userId,
        role: decoded.role,
        tokenVersion: decoded.tokenVersion,
      })

      req.user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        tokenVersion: decoded.tokenVersion
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
