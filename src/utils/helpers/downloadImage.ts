import fs from 'fs';
import path from 'path';

import axios from 'axios';

export const downloadImage = async (
  url: string,
  outputPath: string
): Promise<string> => {
  const dir = path.dirname(outputPath);

  // Убедитесь, что директория существует
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const writer = fs.createWriteStream(outputPath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(outputPath));
    writer.on('error', (error) => {
      console.error('Ошибка при загрузке изображения:', error);
      reject(error);
    });
  });
};
