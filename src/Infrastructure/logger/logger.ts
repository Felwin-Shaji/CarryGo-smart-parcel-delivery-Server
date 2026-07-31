import { createLogger, transports, format, addColors } from 'winston';
import 'winston-daily-rotate-file';
import { ENV } from '../constants/env';

addColors({
  error: "bold red",
  warn: "bold yellow",
  info: "bold cyan",
  http: "bold magenta",
  verbose: "blue",
  debug: "green",
  silly: "grey",
});

const consoleTransport = new transports.Console({
  level: ENV.IS_PROD ? "info" : "debug",
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} ${level}: ${stack ?? message}`;
    })
  ),
});

const fileTransport = new transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "3d",
  zippedArchive: true,
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
});

const errorTransport = new transports.DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "5d",
  zippedArchive: true,
  level: "error",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
});

const logger = createLogger({
  level: ENV.IS_PROD ? "info" : "debug",
  transports: [
    consoleTransport,
    fileTransport,
    errorTransport,
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "logs/exceptions.log",
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: "logs/rejections.log",
    }),
  ],
  exitOnError: false,
});

export default logger;