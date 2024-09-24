import { format } from 'winston';
import { colorizeLevel, colors } from './colors';

export const consoleFormat = format.combine(
  format.timestamp(),
  format.printf(({ level, message, timestamp, context, ...meta }) => {
    const localTimestamp = new Date(timestamp).toLocaleString();
    const formattedTimestamp = `${colors.fg.cyan}${localTimestamp}${colors.reset}`;
    const formattedContext = context ? `${colors.fg.yellow}[${context}]${colors.reset}` : '';
    const formattedMessage = `${colors.bright}${message}${colors.reset}`;
    const formattedMeta = Object.keys(meta).length
      ? `\n${colors.dim}${JSON.stringify(meta, null, 2)}${colors.reset}`
      : '';

    return `${formattedTimestamp} ${colorizeLevel(level)} ${formattedContext} ${formattedMessage} ${formattedMeta}`;
  }),
);

export const fileFormat = format.combine(
  format.timestamp(),
  format.printf(({ level, message, timestamp, context, ...meta }) => {
    const localTimestamp = new Date(timestamp).toLocaleString();
    const formattedContext = context ? `[${context}]` : '';
    const formattedMessage = message;
    const formattedMeta = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';

    return `${localTimestamp} ${level.toUpperCase()} ${formattedContext} ${formattedMessage} ${formattedMeta}`;
  }),
);
