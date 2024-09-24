import { format, transports } from 'winston';
import { consoleFormat, fileFormat } from './format';

export const winstonConfig = {
  level: process.env.NODE_ENV == 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
    consoleFormat,
  ),
  transports: [
    new transports.Console({ format: format.combine(format.timestamp(), consoleFormat) }),
    ...(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'staging'
      ? [
          new transports.File({
            filename: 'logs/combine.log',
            level: 'info',
            format: fileFormat,
          }),
          new transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: fileFormat,
          }),
        ]
      : []),
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log', format: fileFormat })],
};
