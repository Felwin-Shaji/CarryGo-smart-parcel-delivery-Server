import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TokenService } from "../../../Infrastructure/services/token.service.js";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";
import { AppError } from "../../../Domain/utils/customError.js";
import type { Role } from "../../../Infrastructure/Types/types.js";

declare module "express" {
  export interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
}

export const authenticate = (allowedRoles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenService = container.resolve(TokenService);

      const cookies = req.cookies;
      const url = req.baseUrl;

      let accessToken: string | undefined;

      if (url.startsWith("/api/user")) accessToken = cookies?.useraccessTokenName;
      else if (url.startsWith("/api/agency")) accessToken = cookies?.agencyaccessTokenName;
      else if (url.startsWith("/api/admin")) accessToken = cookies?.adminaccessTokenName;
      else if (url.startsWith("/api/hub")) accessToken = cookies?.hubaccessTokenName;
      else if (url.startsWith("/api/worker")) accessToken = cookies?.workeraccessTokenName;


      if (!accessToken) throw new AppError("Unauthorized: Access token missing", STATUS.UNAUTHORIZED);

      const decoded = tokenService.verifyAccessToken(accessToken);
      if (!decoded) throw new AppError("Invalid or expired token", STATUS.UNAUTHORIZED);

      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        throw new AppError("Forbidden: Role not allowed", STATUS.FORBIDDEN);
      }

      req.user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
