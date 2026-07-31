import type { Request, Response, NextFunction } from "express";
import logger from "../../../Infrastructure/logger/logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const duration =
      Number(process.hrtime.bigint() - start) / 1_000_000;

    logger.info({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration.toFixed(2)}ms`,
      ip: req.ip,
      userAgent: req.get("user-agent"),
      contentLength: res.getHeader("content-length"),
    });
  });

  next();
};