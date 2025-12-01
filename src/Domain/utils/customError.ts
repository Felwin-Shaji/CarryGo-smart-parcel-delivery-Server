export class AppError extends Error {
  public readonly _statusCode: number;
  public readonly _isOperational: boolean;
  public readonly _details?: unknown;

  constructor(message: string, statusCode = 500, isOperational = true, details?: unknown) {
    super(message);
    this._statusCode = statusCode;
    this._isOperational = isOperational;
    this._details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

