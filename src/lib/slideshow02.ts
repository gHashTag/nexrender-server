/* eslint-disable functional/no-throw-statement */
import { existsSync } from 'fs';
import { join } from 'path';

import { render } from '@nexrender/core';

import {
  checkFile,
  createFileUrl,
  getVideoDuration,
  trimVideo,
} from './helpers/helpers';
import { Asset, Job, Template } from './types.spec';

// Определяем базовые пути
const baseDir = process.cwd();
const videoDir = join(baseDir, 'video');
const imageDir = join(baseDir, 'album');
const templateDir = join(baseDir, 'template');
const outputDir = join(baseDir, 'output');

// Определяем пути к файлам
const sourceVideoPath = join(videoDir, '4.mp4');
// const sourceVideoPath2 = join(videoDir, 'bg-soft.mp4');

const templatePath = join(templateDir, 'slideshow02', 'slideshow02.aep');

// Определяем выходной файл
const outputPath = join(outputDir, 'output.mp4');

// Определяем шаблон
const template: Template = {
  src: createFileUrl(templatePath),
  composition: 'Controller',
  outputModule: 'H.264 - Match Render Settings - 15 Mbps',
  outputExt: 'mp4',
  settingsTemplate: 'Best Settings',
};

const imagePaths = Array.from({ length: 25 }, (_, i) =>
  join(imageDir, 'kata', `resized_kata${i + 1}.jpeg`)
);

const imageAssets = imagePaths.map((path, index) => ({
  src: createFileUrl(path),
  type: 'image' as const,
  composition: `Footage_${String(index + 1).padStart(2, '0')}`,
  layerName: `${String(index + 1).padStart(2, '0')}.jpg`,
}));

// Определяем ассеты
const assets: readonly Asset[] = [
  {
    type: 'data',
    composition: 'Text_01',
    layerName: 'Text_01',
    property: 'Source Text',
    value: 'Hello World',
  },
  ...imageAssets,
];

const main = async (): Promise<void> => {
  try {
    // Проверяем существование директорий
    [videoDir, templateDir, outputDir].forEach((dir) => {
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

    const job: Job = {
      template,
      assets,
      actions: {
        postrender: [
          {
            module: '@nexrender/action-encode',
            preset: 'mp4',
            output: outputPath,
          },
        ],
      },
    };

    // Рендерим видео
    await render(job, {
      binary: '/Applications/Adobe After Effects 2025/aerender',
      skipCleanup: true, // Для отладки
      debug: true, // Для отладки
    });

    console.log('Рендеринг завершен успешно');

    // После рендеринга обрезаем видео
    await trimVideo(
      sourceVideoPath,
      join(baseDir, 'output', 'output.mp4'),
      join(baseDir, 'output', 'newoutput.mp4'),
      duration
    );

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
