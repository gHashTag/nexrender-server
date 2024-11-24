import fs from 'fs';
import path from 'path';

import Replicate from 'replicate';

import { Step } from './generateAssets';

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

type ImageResult = {
  readonly imagePath: string;
  readonly text: '';
};

export async function generateImagesForNeuroBroker(
  steps: readonly Step[]
): Promise<readonly ImageResult[]> {
  try {
    console.log('=== Начало generateImagesForNeuroBroker ===');
    console.log('Текущая директория:', __dirname);

    // Проверяем существование директории images
    const imagesDir = path.join(__dirname, '../../../images');
    if (!fs.existsSync(imagesDir)) {
      console.log('Создаем директорию images:', imagesDir);
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    if (!steps?.[0]?.details) {
      console.error('Отсутствует описание первого шага');
      return [];
    }

    const firstStepDetails = steps[0].details;
    console.log('Детали первого шага:', firstStepDetails);

    const results = await Promise.all(
      Array.from({ length: 25 }, async (_, index) => {
        const paddedIndex = String(index).padStart(2, '0');
        console.log(`\nГенерация изображения ${paddedIndex} из 25`);

        try {
          const model =
            'ghashtag/so_origin_kata:e82316f373dea8e2e97748d7dbfe269895a70e2891c18a2403a2080c942bb5b2';

          const input = {
            prompt: firstStepDetails,
            model: 'dev',
            lora_scale: 1,
            num_outputs: 1,
            aspect_ratio: '9:16',
            output_format: 'png',
            guidance_scale: 3.5,
            output_quality: 90,
            prompt_strength: 0.8,
            extra_lora_scale: 1,
            num_inference_steps: 28,
          };

          const outputPath = path.join(
            __dirname,
            `../../../images/output_${paddedIndex}.png`
          );
          console.log('Путь сохранения:', outputPath);

          const output = await replicate.run(model, {
            input: input,
          });

          // output это массив URL'ов
          if (!Array.isArray(output) || !output[0]) {
            return {
              imagePath: '',
              text: 'Некорректный ответ от API',
            };
          }

          const imageUrl = output[0];
          console.log('Получен URL изображения:', imageUrl);

          await saveImage(imageUrl, outputPath);
          console.log('Изображение сохранено успешно');

          return {
            imagePath: outputPath,
            text: '',
          };
        } catch (error) {
          console.error(
            `Ошибка при генерации изображения ${paddedIndex}:`,
            error
          );
          return {
            imagePath: '',
            text: '',
          };
        }
      })
    );

    console.log('=== Конец generateImagesForNeuroBroker ===');
    console.log('Количество результатов:', results.length);
    return results as readonly ImageResult[];
  } catch (error) {
    console.error('Ошибка в generateImagesForNeuroBroker:', error);
    return [];
  }
}

// Вспомогательная функция для сохранения изображения
async function saveImage(url: string, outputPath: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return;
    }
    const buffer = await response.arrayBuffer();
    await fs.promises.writeFile(outputPath, Buffer.from(buffer), 'binary');
    console.log(`Изображение сохранено: ${outputPath}`);
  } catch (error) {
    console.error('Ошибка при сохранении изображения:', error);
  }
}

export async function reuseImagesForNeuroBroker(): Promise<
  readonly ImageResult[]
> {
  try {
    console.log('=== Начало reuseImagesForNeuroBroker ===');

    const imagesDir = path.join(__dirname, '../../../images');
    if (!fs.existsSync(imagesDir)) {
      console.error('Директория images не существует:', imagesDir);
      return [];
    }

    // Получаем список всех PNG файлов в директории
    const files = fs
      .readdirSync(imagesDir)
      .filter((file) => file.startsWith('output_') && file.endsWith('.png'))
      .sort((a, b) => {
        // Сортируем по номеру в имени файла
        const numA = parseInt(a.match(/output_(\d+)\.png/)?.[1] || '0');
        const numB = parseInt(b.match(/output_(\d+)\.png/)?.[1] || '0');
        return numA - numB;
      });

    const results = files.map((file) => ({
      imagePath: path.join(imagesDir, file),
      text: '',
    }));

    console.log('=== Конец reuseImagesForNeuroBroker ===');
    console.log('Количество результатов:', results.length);
    return results as readonly ImageResult[];
  } catch (error) {
    console.error('Ошибка в reuseImagesForNeuroBroker:', error);
    return [];
  }
}
