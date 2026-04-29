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

      const tokenMap = {
        user: cookies?.useraccessTokenName,
        agency: cookies?.agencyaccessTokenName,
        admin: cookies?.adminaccessTokenName,
        hub: cookies?.hubaccessTokenName,
        worker: cookies?.workeraccessTokenName,
      };

      let accessToken: string | undefined;

      if (url.startsWith("/api/user")) accessToken = tokenMap.user;
      else if (url.startsWith("/api/agency")) accessToken = tokenMap.agency;
      else if (url.startsWith("/api/admin")) accessToken = tokenMap.admin;
      else if (url.startsWith("/api/hub")) accessToken = tokenMap.hub;
      else if (url.startsWith("/api/worker")) accessToken = tokenMap.worker;

      // fallback
      if (!accessToken) {
        accessToken = Object.values(tokenMap).find(Boolean);
      }



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
