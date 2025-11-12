import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TokenService } from "../../Infrastructure/services/token.service.js";
import { STATUS } from "../../Infrastructure/constants/statusCodes.js";
import { AppError } from "../../Domain/utils/customError.js";
import type { Role } from "../../Infrastructure/Types/types.js";

export const authenticate = (allowedRoles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenService = container.resolve(TokenService);

      const cookies = req.cookies;

      console.log(req.cookies);
      const accessToken =
        cookies?.useraccessTokenName ||
        cookies?.agencyaccessTokenName ||
        cookies?.adminaccessTokenName ||
        cookies?.hubaccessTokenName ||
        cookies?.workeraccessTokenName;

      if (!accessToken) throw new AppError("Unauthorized: Access token missing", STATUS.UNAUTHORIZED);
      
      const decoded = tokenService.verifyAccessToken(accessToken);
      if (!decoded) throw new AppError("Invalid or expired token", STATUS.UNAUTHORIZED);
      
      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        throw new AppError("Forbidden: Role not allowed", STATUS.FORBIDDEN);
      }

      (req as any).user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };

      console.log("Authenticated user:", (req as any).user);
      next();
    } catch (error) {
      next(error);
    }
  };
};
