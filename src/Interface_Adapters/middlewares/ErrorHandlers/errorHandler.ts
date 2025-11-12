import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../Domain/utils/customError.js";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";
import logger from "../../../Infrastructure/logger/logger.js";


export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    let appError: AppError;

    if (err instanceof AppError) {
        appError = err;
    } else if (err instanceof Error) {
        appError = new AppError(err.message, STATUS.INTERNAL_SERVER_ERROR);
    } else {
        appError = new AppError("unknown error", STATUS.INTERNAL_SERVER_ERROR);
    };

    const isDev = process.env.NODE_ENV === "development";

    logger.error(`[${req.method}] ${req.url} - ${appError.message}`);
    const responseBody: Record<string, unknown> = {
        success: false,
        message: appError.message,
    };

    if (appError.details) responseBody.details = appError.details;
    if (isDev) responseBody.stack = appError.stack;
    console.log(responseBody.message,'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
    return res.status(appError.statusCode).json(responseBody);
};