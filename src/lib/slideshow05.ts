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

type ImageAsset = {
  readonly src: string;
  readonly type: 'image';
  readonly composition: string;
  readonly layerName: string;
};

// Функция для создания путей к изображениям
const createImageAssets = (count: number): readonly ImageAsset[] =>
  Array.from({ length: count }, (_, i) => ({
    src: createFileUrl(
      join(__dirname, `../images/output_${String(i).padStart(2, '0')}.png`)
    ),
    type: 'image',
    composition: `Plch_${String(i + 1).padStart(2, '0')}`,
    layerName: `${String(i + 1).padStart(2, '0')}.jpg`,
  }));
// Определяем ассеты
const assets: readonly Asset[] = [
  {
    type: 'data',
    composition: 'Scene 1',
    layerName: 'we are best team',
    property: 'Source Text',
    value: 'Condominium KATA',
  },
  {
    type: 'data',
    composition: 'Scene 1',
    layerName: 'make an amazing',
    property: 'Source Text',
    value: 'Phuket, Thailand',
  },
  {
    type: 'data',
    composition: 'Scene 2',
    layerName: 'smileee!',
    property: 'Source Text',
    value: 'Tropical Paradise',
  },
  {
    type: 'data',
    composition: 'Scene 3',
    layerName: 'travel!',
    property: 'Source Text',
    value: 'Heart of Kata Beach',
  },
  {
    type: 'data',
    composition: 'Scene 4',
    layerName: 'be yourself',
    property: 'Source Text',
    value: "Phuket's Elite Area",
  },
  {
    type: 'data',
    composition: 'Scene 5',
    layerName: 'think about yourself',
    property: 'Source Text',
    value: '5 Minutes to Ocean',
  },
  {
    type: 'data',
    composition: 'Scene 7',
    layerName: 'futuristic',
    property: 'Source Text',
    value: 'Kata Beach',
  },
  {
    type: 'data',
    composition: 'Scene 8',
    layerName: 'and',
    property: 'Source Text',
    value: 'Perfect Balance',
  },
  {
    type: 'data',
    composition: 'Scene 9',
    layerName: 'cinematic',
    property: 'Source Text',
    value: 'Kata Beach',
  },
  {
    type: 'data',
    composition: 'Scene 9',
    layerName: 'view',
    property: 'Source Text',
    value: 'Modern Design',
  },
  {
    type: 'data',
    composition: 'Scene 10',
    layerName: 'colorful',
    property: 'Source Text',
    value: 'Exclusive Living',
  },
  {
    type: 'data',
    composition: 'Scene 11',
    layerName: 'make with us!',
    property: 'Source Text',
    value: 'Elite',
  },
  {
    type: 'data',
    composition: 'Scene 11',
    layerName: 'opener',
    property: 'Source Text',
    value: 'Invest Now',
  },
  ...createImageAssets(25),
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
