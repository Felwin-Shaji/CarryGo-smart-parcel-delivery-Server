import { createLogger, transports, format } from 'winston';
import 'winston-daily-rotate-file';
import { ENV } from '../constants/env';

const consoleFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `{level:${level} ---- message:${stack || message} ---- timestamp:${timestamp}}`
});

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.log',  // log file per day
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,              // compress old logs
  maxSize: '20m',                   // max size per file
  maxFiles: '5d',                  // keep logs for 5 days
  level: ENV.IS_PROD ? "info" : "debug"
});

const logger = createLogger({
    level: ENV.IS_PROD ? 'info' : 'debug',
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        consoleFormat 
    ),
    transports: [
        new transports.Console(),
        dailyRotateFileTransport
    ]
});

export default logger;
