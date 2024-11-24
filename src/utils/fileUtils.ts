import { existsSync, mkdirSync } from "fs";

export const ensureDirectories = (paths: readonly string[]): void => {
  paths.forEach((path) => {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  });
};
