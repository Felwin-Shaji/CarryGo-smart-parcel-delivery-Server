import { createLogger, transports, format } from 'winston';
import 'winston-daily-rotate-file';

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.log',  // log file per day
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,              // compress old logs
  maxSize: '20m',                   // max size per file
  maxFiles: '30d',                  // keep logs for 30 days
  level: 'debug'
});

const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        dailyRotateFileTransport
    ]
});

export default logger;
