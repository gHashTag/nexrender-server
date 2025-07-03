import "dotenv/config";
import { logger } from "./utils/logger";

process.removeAllListeners("warning");

try {
  // Import and start server
  const server = require("@nexrender/server");
  const CONFIG = {
    server: {
      port: process.env.NEXRENDER_PORT || 3000,
      secret: process.env.NEXRENDER_SECRET || 'myapisecret'
    }
  };
  
  const port = CONFIG.server.port;
  const secret = CONFIG.server.secret;
  
  server.listen(port, secret, () => {
    logger.info("🕉️ Nexrender сервер запущен", [
      `порт: ${port}`,
      `secret: ${secret}`,
    ]);
  });
  
} catch (error) {
  logger.error("Ошибка при запуске сервера:", [error]);
  process.exit(1);
}
