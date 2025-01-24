import path from 'path';
import fs, { createWriteStream } from 'fs';
import { elevenlabs } from '.';

const ELEVENLABS_API_KEY = 'sk_1c0e45a1c3a484f276b824d71e5bf81c2334886b876d87dd'

type CreateAudioOptions = {
  text: string;
  voice_id: string;
  outputPath?: string;
};

export const createAudioFileFromText = async ({
  text,
  voice_id,
  outputPath,
}: CreateAudioOptions): Promise<string> => {
  // Логируем входные данные
  console.log('Attempting to create audio with:', {
    voice_id,
    textLength: text.length,
    apiKeyPresent: !!ELEVENLABS_API_KEY,
    apiKeyPrefix: ELEVENLABS_API_KEY?.substring(0, 5),
  });

  // Проверяем наличие API ключа
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY отсутствует');
  }

  try {
    // Логируем попытку генерации
    console.log('Generating audio stream...');

    const audioStream = await elevenlabs.generate({
      voice: voice_id,
      model_id: 'eleven_turbo_v2_5',
      text,
    });

    // Логируем успешную генерацию
    console.log('Audio stream generated successfully');

    // Убедитесь, что папка ai-init существует
    const audioDir = path.join(__dirname, outputPath || 'ai-init');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir);
    }

    const finalOutputPath = path.join(audioDir, `audio_${Date.now()}.mp3`);
    const writeStream = createWriteStream(finalOutputPath);

    return await new Promise<string>((resolve, reject) => {
      audioStream.pipe(writeStream);

      writeStream.on('finish', () => {
        console.log('Audio file written successfully to:', finalOutputPath);
        resolve(finalOutputPath);
      });

      writeStream.on('error', error => {
        console.error('Error writing audio file:', error);
        reject(error);
      });
    });
  } catch (error: any) {
    console.error('Error in createAudioFileFromText:', {
      message: error.message,
      statusCode: error.statusCode,
      stack: error.stack,
    });
    throw error;
  }
};