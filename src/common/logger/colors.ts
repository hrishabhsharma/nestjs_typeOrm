export const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m',
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};

export const colorizeLevel = (lvl: string): string => {
  switch (lvl) {
    case 'error':
      return `${colors.fg.red}${colors.bright}ERROR${colors.reset}`;
    case 'warn':
      return `${colors.fg.yellow}${colors.bright}WARN ${colors.reset}`;
    case 'info':
      return `${colors.fg.green}${colors.bright}INFO ${colors.reset}`;
    case 'debug':
      return `${colors.fg.blue}${colors.bright}DEBUG${colors.reset}`;
    default:
      return lvl.toUpperCase();
  }
};
