import { config } from 'dotenv';

// Загружаем переменные окружения
config();

const server = require('@nexrender/server');

const port = process.env.NEXRENDER_PORT || 3000;
const secret = process.env.NEXRENDER_SECRET || 'myapisecret';

server
  .listen(port, secret, () => {
    console.log(`Nexrender сервер запущен на порту ${port}`);
  })
  .on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Порт ${port} уже используется`);
    } else {
      console.error('Ошибка сервера:', error);
    }
    process.exit(1);
  });
