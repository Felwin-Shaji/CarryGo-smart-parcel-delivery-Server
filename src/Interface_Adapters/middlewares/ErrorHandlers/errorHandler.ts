import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../Domain/utils/customError.js";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";
import logger from "../../../Infrastructure/logger/logger.js";
import { ApiResponse } from "../../presenters/ApiResponse.js";
import { ENV } from "../../../Infrastructure/constants/env.js";
import { ERROR_MESSAGES } from "../../../Infrastructure/constants/messages/errorMessages.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isDev = ENV.IS_DEV 
  let appError: AppError;

  if (err instanceof AppError) {
    appError = err;
  } else if (err instanceof Error) {
    appError = new AppError(
      isDev ? err.message : ERROR_MESSAGES.INTERNAL_ERROR,
      STATUS.INTERNAL_SERVER_ERROR
    );
  } else {
    appError = new AppError(
      isDev ? ERROR_MESSAGES.UNKNOWN_ERROR : ERROR_MESSAGES.INTERNAL_ERROR,
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
