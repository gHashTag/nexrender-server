type LogLevel = "info" | "error" | "debug";

const getTimestamp = (): string => new Date().toISOString();

const log = (
  level: LogLevel,
  message: string,
  args: readonly unknown[] = []
): boolean => {
  console[level](
    `[${getTimestamp()}] ${level.toUpperCase()}: ${message}`,
    ...args
  );
  return true;
};

export const logger = {
  info: (message: string, args: readonly unknown[] = []): boolean =>
    log("info", message, args),
  error: (message: string, args: readonly unknown[] = []): boolean =>
    log("error", message, args),
  debug: (message: string, args: readonly unknown[] = []): boolean => {
    if (process.env.DEBUG) {
      return log("debug", message, args);
    }
    return true;
  },
};
