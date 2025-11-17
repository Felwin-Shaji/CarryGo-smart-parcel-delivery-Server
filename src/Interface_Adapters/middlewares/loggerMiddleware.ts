import type { Request, Response, NextFunction } from "express";
import logger from "../../Infrastructure/logger/logger.js";

/**
 * Logs every incoming request to the server
 * including method, URL, status code, response time, and optional request body.
 */
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();



  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      time: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      body: req.body
    };

    const safeBody =
      typeof log.body === "object"
        ? JSON.stringify(log.body)
        : String(log.body);

    logger.info(
      `[${log.time}] ${log.method} ${log.url} ${log.statusCode} - ${log.duration} - IP: ${log.ip}-------${safeBody}`
    );
  });

  next();
};
