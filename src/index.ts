import "dotenv/config";
import { server } from "./api/server";
import { logger } from "./utils/logger";

process.removeAllListeners("warning");

try {
  server();
} catch (error) {
  logger.error("Ошибка при запуске сервера:", [error]);
  process.exit(1);
}
