import { existsSync } from "fs";
import fs from "fs";
import { join, resolve } from "path";

import { CONFIG } from "../config/constants";

export const createFileUrl = (filePath: string): string => {
  const absolutePath = resolve(filePath);
  console.log("Checking file exists:", absolutePath);
  checkFile(absolutePath);
  return `file://${absolutePath}`;
};

export const checkFile = (filePath: string): boolean => {
  return existsSync(filePath);
};

export const ensureDirectories = (dirs: readonly string[]): boolean => {
  dirs.forEach((dir) => {
    if (!existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  return true;
};

export const getTemplatePath = (templateName: string): string =>
  join(process.cwd(), "src", CONFIG.paths.templates, templateName);
