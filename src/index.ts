import "dotenv/config";
import { startServer } from "./api/server";
import { logger } from "./utils/logger";

process.removeAllListeners("warning");

try {
  startServer();
} catch (error) {
  logger.error("Ошибка при запуске сервера:", [error]);
  process.exit(1);
}
