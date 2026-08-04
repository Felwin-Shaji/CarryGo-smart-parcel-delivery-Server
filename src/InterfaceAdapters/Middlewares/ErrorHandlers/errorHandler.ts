import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../Domain/Utils/customError";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import logger from "../../../Infrastructure/Logger/logger";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { ERROR_MESSAGES } from "../../../Infrastructure/Constants/Messages/errorMessages";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let appError: AppError;

  if (err instanceof AppError) {
    appError = err;
  } else if (err instanceof Error) {
    appError = new AppError(err.message, STATUS.INTERNAL_SERVER_ERROR);
  } else {
    appError = new AppError(
      ERROR_MESSAGES.UNKNOWN_ERROR,
      STATUS.INTERNAL_SERVER_ERROR
    );
  }

  logger.error(`[${req.method}] ${req.url} - ${appError.message}`);

  return res.status(appError._statusCode).json(
    ApiResponse.failure(
      appError.message,
      ERROR_MESSAGES.INTERNAL_ERROR,
    )
  );
}
