import fs from 'fs';
import { join } from 'path';

import { assetsNews } from './assets';
import { createFileUrl } from './helpers/helpers';
import { Job, Template } from './types.spec';

const baseDir = process.cwd();
const outputDir = join(baseDir, 'output');
const outputFileName = 'neuronews.mp4';
const outputPath = join(outputDir, outputFileName);

export const createRenderJob = (projectName: string): Job => {
  // Создаем директорию output, если она не существует
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Определяем пути
  const templatePath = join(baseDir, 'template', projectName, `neuronews.aep`);

  // Определяем шаблон
  const template: Template = {
    src: createFileUrl(templatePath),
    composition: 'Instagram_Story',
    outputModule: 'H.264 - Match Render Settings - 15 Mbps',
    outputExt: 'mp4',
    settingsTemplate: 'Best Settings',
    output: outputPath,
  };

  console.log('Output path:', outputPath); // Для отладки

  // Создаем задание
  const job = {
    template,
    assets: assetsNews,
  };

  // Для отладки
  console.log('Job configuration:', JSON.stringify(job, null, 2));

  return job;
};
