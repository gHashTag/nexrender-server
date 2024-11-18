import { join } from 'path';

import { createFileUrl } from './helpers/helpers';
import { Asset, Template } from './types.spec';

// Определяем базовые пути
const baseDir = process.cwd();
const assetsDir = join(baseDir, 'template', 'NEURONEWS', 'Assets');
const templateDir = join(baseDir, 'template', 'NEURONEWS');
const outputDir = join(baseDir, 'output');

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
export const outputPath = join(outputDir, 'output1.mp4');

// Определяем шаблон
export const template: Template = {
  src: createFileUrl(templatePath),
  composition: 'Instagram_Story',
  outputModule: 'H.264 - Match Render Settings - 15 Mbps',
  outputExt: 'mp4',
  settingsTemplate: 'Best Settings',
};

// Определяем ассеты
export const assetsNews: readonly Asset[] = [
  {
    type: 'data',
    composition: 'Text_02',
    layerName: 'Text_02',
    property: 'Source Text',
    value: 'RECRAFT',
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

// Экспортируем пути для проверки
export const paths = {
  assetsDir,
  templateDir,
  outputDir,
  sourceVideoPath,
  templatePath,
};
