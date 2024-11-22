/* eslint-disable functional/no-throw-statement */
import { existsSync } from 'fs';
import { join } from 'path';

import {
  checkFile,
  createFileUrl,
  createRender,
  getVideoDuration,
  trimVideo,
  uploadVideo,
} from './helpers/helpers';
import { Asset, Job, Template } from './types.spec';

const brandName = 'GEMINI';

// Определяем базовые пути
const baseDir = process.cwd();
const assetsDir = join(baseDir, 'template', 'NEURONEWS', 'Assets');
const templateDir = join(process.cwd(), 'template', 'NEURONEWS');
const outputDir = join(process.cwd(), 'output');

// Определяем пути к файлам
const sourceVideoPath = join(assetsDir, 'sourceVideoPath.mp4');
const bgVideoPath01 = join(assetsDir, 'bg-video01.mp4');
const bgVideoPath02 = join(assetsDir, 'bg-video02.mp4');
const bgVideoPath03 = join(assetsDir, 'bg-video03.mp4');
const bgVideoPath04 = join(assetsDir, 'bg-video04.mp4');
const image01Path = join(assetsDir, 'cover01.png');
const audioPath = join(assetsDir, 'news.mp3');
const templatePath = join(templateDir, 'neuronews.aep');

// Определяем выходной файл
const outputPath = join(outputDir, 'output.mp4');

// Определяем шаблон
const template: Template = {
  src: createFileUrl(templatePath),
  composition: 'Instagram_Story',
  outputModule: 'H.264 - Match Render Settings - 15 Mbps',
  outputExt: 'mp4',
  settingsTemplate: 'Best Settings',
};

const main = async (): Promise<void> => {
  try {
    // Проверяем существование директорий
    [assetsDir, templateDir, outputDir].forEach((dir) => {
      if (!existsSync(dir)) {
        throw new Error(`Директория не найдена: ${dir}`);
      }
    });

    // Проверяем существование файлов
    [sourceVideoPath, templatePath].forEach(checkFile);

    console.log('Исходное видео:', sourceVideoPath);
    console.log('Шаблон:', templatePath);
    console.log('Выходной файл:', outputPath);

    // Получаем длительность исходного видео
    const duration = await getVideoDuration(sourceVideoPath);
    console.log(`Длительность видео ${sourceVideoPath}: ${duration} секунд`);

    // Определяем ассеты
    const assets: readonly Asset[] = [
      {
        type: 'data',
        composition: 'Text_02',
        layerName: 'Text_02',
        property: 'Source Text',
        value: brandName,
      },
      {
        type: 'video',
        src: createFileUrl(sourceVideoPath),
        layerName: 'Video_01',
      },
      {
        type: 'video',
        src: createFileUrl(bgVideoPath01),
        layerName: 'BG_01',
      },
      {
        type: 'video',
        src: createFileUrl(bgVideoPath02),
        layerName: 'BG_02',
      },
      {
        type: 'video',
        src: createFileUrl(bgVideoPath03),
        layerName: 'BG_03',
      },
      {
        type: 'video',
        src: createFileUrl(bgVideoPath04),
        layerName: 'BG_04',
      },
      {
        src: createFileUrl(image01Path),
        type: 'image',
        composition: 'Instagram_Story',
        layerName: 'Photo_01',
      },
      {
        type: 'audio',
        src: createFileUrl(audioPath),
        layerName: 'Audio_01',
      },
    ];

    const job: Job = {
      template,
      assets,
    };

    // Отправляем задание на сервер
    const response = await fetch(
      `http://localhost:${process.env.NEXRENDER_PORT}/api/v1/jobs`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'nexrender-secret': process.env.NEXRENDER_SECRET || 'myapisecret',
        },
        body: JSON.stringify(job),
      }
    );

    const result = await response.json();
    console.log('Задание создано:', result);

    // После рендеринга обрезаем видео
    await trimVideo(
      sourceVideoPath,
      join(outputDir, 'output.mp4'),
      join(outputDir, 'newoutput.mp4'),
      duration
    );
    const videoUrl = await uploadVideo(
      join(outputDir, 'newoutput.mp4'),
      'temp',
      'newoutput.mp4'
    );

    if (!videoUrl) {
      throw new Error('Видео не загружено');
    }

    const subTitles = await createRender({
      template_id: '10f7cf9f-9c44-479b-ad65-ea8b9242ccb1',
      modifications: { 'Video-1': videoUrl.publicUrl },
    });
    console.log(subTitles, 'subTitles');

    console.log('Все операции завершены успешно');
  } catch (error) {
    console.error('Ошибка в процессе выполнения:', error);
    throw error;
  }
};

// Запускаем основную функцию
main().catch((error) => {
  console.error('Критическая ошибка:', error);
  process.exit(1);
});
