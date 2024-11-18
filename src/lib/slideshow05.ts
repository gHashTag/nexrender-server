/* eslint-disable functional/no-throw-statement */
import { existsSync } from 'fs';
import { join } from 'path';

import { render } from '@nexrender/core';

import { saveImagesToSupabase } from '../core/supabase/saveImagesToSupabase';

import {
  checkFile,
  createFileUrl,
  getVideoDuration,
  trimVideo,
} from './helpers/helpers';
import { reuseImagesForNeuroBroker } from './helpers/neurobroker/generateImagesForNeuroBroker';
import { instruction, triggerWord, type } from './helpers/neurobroker/mock';
import { getSellVillaSteps } from './helpers/openaiHelpers';
import { Asset, Job, Template } from './types.spec';
import { assetsNews } from './assets';

// Определяем базовые пути
const baseDir = process.cwd();
const videoDir = join(baseDir, 'video');
const templateDir = join(baseDir, 'template');
const outputDir = join(baseDir, 'output');

// Определяем пути к файлам
const sourceVideoPath = join(videoDir, '4.mp4');
// const sourceVideoPath2 = join(videoDir, 'bg-soft.mp4');

const templatePath = join(
  templateDir,
  'slideshow05',
  'Futuristic Dynamic Opener',
  'Story',
  'Futuristic Dynamic Opener.aep'
);

// Определяем выходной файл
const outputPath = join(outputDir, 'output.mp4');

// Определяем шаблон
const template: Template = {
  src: createFileUrl(templatePath),
  composition: 'Render Comp',
  outputModule: 'H.264 - Match Render Settings - 15 Mbps',
  outputExt: 'mp4',
  settingsTemplate: 'Best Settings',
};

// Определяем ассеты

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
    const sellVillaSteps = await getSellVillaSteps(instruction);

    if (!sellVillaSteps?.activities?.[0]?.steps) {
      throw new Error('Не удалось получить steps из sellVillaSteps');
    }

    // const englishImages = await generateImagesForNeuroBroker(
    //   sellVillaSteps.activities[0].steps
    // );

    // DEGUB local images
    const englishImages = await reuseImagesForNeuroBroker();
    console.log(englishImages, 'englishImages');
    // const projectId = 'neurobroker';
    // const savedImages = await saveImagesToSupabase(
    //   englishImages,
    //   projectId,
    //   triggerWord,
    //   type,
    //   instruction.location
    // );
    // console.log(savedImages, 'savedImages');
    // const assets = await generateAssets({
    //   sellVillaSteps,
    //   triggerWord: triggerWord,
    // });
    // console.log(JSON.stringify(assets, null, 2), 'assets');
    // console.log('Исходное видео:', sourceVideoPath);
    // console.log('Шаблон:', templatePath);
    // console.log('Выходной файл:', outputPath);
    // Получаем длительность исходного видео
    const duration = await getVideoDuration(sourceVideoPath);
    console.log(`Длительность видео ${sourceVideoPath}: ${duration} секунд`);
    const job: Job = {
      template,
      assets: assetsNews,
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
    console.log(job, 'job');
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
