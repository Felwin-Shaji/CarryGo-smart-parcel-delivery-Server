import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TokenService } from "../../../Infrastructure/services/token.service";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AppError } from "../../../Domain/Utils/customError";
import type { AppJwtPayload, Role } from "../../../Infrastructure/Types/types";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";
import { IValidateSessionUseCase } from "../../../Application/Interfaces/UseCases/Auth/IValidateSessionUseCase";


declare module "express" {
  export interface Request {
    user?: {
      id: string;
      email: string;
      role: Role;
      tokenVersion: number;
    };
  }
};


type TokenMap = Record<Role, string | undefined>;

export const authenticate = (allowedRoles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenService = container.resolve(TokenService);
      const validateSession = container.resolve<IValidateSessionUseCase>("IValidateSessionUseCase");

      const cookies = req.cookies as Partial<Record<string, string>>;

      const tokenMap: TokenMap = {
        user: cookies.useraccessTokenName,
        agency: cookies.agencyaccessTokenName,
        admin: cookies.adminaccessTokenName,
        hub: cookies.hubaccessTokenName,
        worker: cookies.workeraccessTokenName,
      };

      const url = req.originalUrl;

      let accessToken: string | undefined;

      if (url.startsWith("/api/user")) {
        accessToken = tokenMap.user;
      } else if (url.startsWith("/api/admin")) {
        accessToken = tokenMap.admin;
      } else if (url.startsWith("/api/agency")) {
        accessToken = tokenMap.agency;
      } else if (url.startsWith("/api/hub")) {
        accessToken = tokenMap.hub;
      } else if (url.startsWith("/api/worker")) {
        accessToken = tokenMap.worker;
      } else {
        // Fallback for routes that aren't role-specific
        accessToken = Object.values(tokenMap).find(Boolean);
      }

      if (!accessToken) {
        throw new AppError(
          AUTH_MESSAGES.TOKEN_MISSING,
          STATUS.UNAUTHORIZED
        );
      }

      const decoded = tokenService.verifyAccessToken(accessToken) as AppJwtPayload;

      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        throw new AppError(
          AUTH_MESSAGES.ROLE_NOT_ALLOWED,
          STATUS.FORBIDDEN
        );
      };

      await validateSession.execute({
        userId: decoded.userId,
        role: decoded.role,
        tokenVersion: decoded.tokenVersion,
      });

      req.user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        tokenVersion: decoded.tokenVersion,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
