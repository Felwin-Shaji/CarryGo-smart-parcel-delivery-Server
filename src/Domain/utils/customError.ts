import { STATUS, StatusCode } from "../../Infrastructure/constants/statusCodes";

export class AppError extends Error {
  public readonly _statusCode: StatusCode;
  public readonly _isOperational: boolean;
  public readonly _details?: unknown;

  constructor(message: string, statusCode:StatusCode = STATUS.INTERNAL_SERVER_ERROR, isOperational = true, details?: unknown) {
    super(message);
    this._statusCode = statusCode;
    this._isOperational = isOperational;
    this._details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

