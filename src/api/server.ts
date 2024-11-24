const server = require("@nexrender/server");
import { CONFIG } from "../config/constants";
import { logger } from "../utils/logger";

const port = CONFIG.server.port;
const secret = CONFIG.server.secret;

server.listen(port, secret, () => {
  logger.info("Nexrender сервер запущен", [
    `порт: ${port}`,
    `secret: ${secret}`,
  ]);
});

export { server };
