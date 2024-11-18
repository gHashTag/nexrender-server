import axios from 'axios';
import { createRenderJob } from './renderJob';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  try {
    // Проверяем сервер с повторными попытками
    console.log('\nПроверка сервера...');
    let serverAvailable = false;
    for (let i = 0; i < 3; i++) {
      try {
        const healthCheck = await axios.get(
          'http://localhost:3000/api/v1/jobs',
          {
            headers: {
              'nexrender-secret': process.env.NEXRENDER_SECRET || 'myapisecret',
            },
            timeout: 2000,
          }
        );
        if (healthCheck.status === 200) {
          serverAvailable = true;
          console.log('Сервер доступен');
          break;
        }
      } catch (error) {
        console.log(
          `Попытка ${
            i + 1
          }: Сервер недоступен, повторная попытка через 2 секунды...`
        );
        await sleep(2000);
      }
    }

    if (!serverAvailable) {
      throw new Error('Сервер недоступен после нескольких попыток');
    }

    // Создаем задание
    console.log('\nСоздание задания...');
    const job = createRenderJob('NEURONEWS');
    console.log('Задание создано');

    // Отправляем задание
    console.log('\nОтправка задания на сервер...');
    const response = await axios.post(
      'http://localhost:3000/api/v1/jobs',
      job,
      {
        headers: {
          'Content-Type': 'application/json',
          'nexrender-secret': process.env.NEXRENDER_SECRET || 'myapisecret',
        },
      }
    );

    const jobId = response.data.uid;
    console.log(`Задание принято, ID: ${jobId}`);

    // Отслеживаем прогресс
    console.log('\nОтслеживание прогресса:');
    while (true) {
      const statusResponse = await axios.get(
        `http://localhost:3000/api/v1/jobs/${jobId}`,
        {
          headers: {
            'nexrender-secret': process.env.NEXRENDER_SECRET || 'myapisecret',
          },
        }
      );
      console.log(statusResponse.data, 'statusResponse.data');

      const { state, renderProgress, error } = statusResponse.data;
      console.log(renderProgress, 'renderProgress');

      console.log(
        `[${new Date().toLocaleTimeString()}] Статус: ${state}, Прогресс: ${
          renderProgress || '0'
        }%`
      );

      if (state === 'finished') {
        console.log('\nРендеринг успешно завершен!', statusResponse.data);
        console.log('Результат доступен в:', statusResponse.data.output);
        break;
      }

      if (state === 'error') {
        console.error('\nОшибка рендеринга:', error);
        break;
      }

      await sleep(5000);
    }
  } catch (error) {
    console.error('\nОшибка:', error);
    process.exit(1);
  }
};

main();
