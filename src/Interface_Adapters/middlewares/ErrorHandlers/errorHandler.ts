import type { Request, Response } from "express";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import logger from "../../../Infrastructure/logger/logger";
import { ApiResponse } from "../../presenters/ApiResponse";
import { ERROR_MESSAGES } from "../../../Infrastructure/constants/messages/errorMessages";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
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
