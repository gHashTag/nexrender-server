import { join } from 'path';

import { assetsNews } from './assets';
import { createFileUrl } from './helpers/helpers';
import { Job, Template } from './types.spec';

const baseDir = process.cwd();
// const outputDir = join(baseDir, 'output');
const outputFileName = 'test.mp4';
// const outputPath = join(outputDir, outputFileName);

export const createRenderJob = (projectName: string): Job => {
  // Определяем пути
  const templatePath = join(baseDir, 'template', projectName, `neuronews.aep`);

  // Определяем шаблон
  const template: Template = {
    src: createFileUrl(templatePath),
    composition: 'Instagram_Story',
    outputModule: 'H.264 - Match Render Settings - 15 Mbps',
    outputExt: 'mp4',
    settingsTemplate: 'Best Settings',
    output: outputFileName,
  };

  console.log(template, 'template');

  // Создаем задание
  const job: Job = {
    template,
    assets: assetsNews,
    actions: {
      postrender: [
        {
          module: '@nexrender/action-encode',
          preset: 'mp4',
          params: {
            '-acodec': 'aac',
            '-ab': '128k',
            '-ar': '44100',
            '-vcodec': 'libx264',
            '-r': '25',
            '-y': '', // Перезаписывать существующий файл
          },
        },
      ],
    },
  };
  console.log(job, 'job');

  return job;
};
