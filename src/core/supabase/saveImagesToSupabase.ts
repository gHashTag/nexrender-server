import fs from 'fs';

import { supabase } from './';

type ImageData = {
  readonly imagePath: string;
  readonly text: string;
};

export async function saveImagesToSupabase(
  images: readonly ImageData[],
  projectId: string,
  triggerWord: string,
  type: string,
  text: string
): Promise<readonly { readonly url: string; readonly id: string }[]> {
  try {
    const results = await Promise.all(
      images.map(async (image, index) => {
        if (!image.imagePath) return null;

        // Читаем файл
        const fileBuffer = await fs.promises.readFile(image.imagePath);
        const fileName = `${projectId}/${index}.png`;

        // Загружаем в Storage
        const { error: storageError } = await supabase.storage
          .from('images')
          .upload(fileName, fileBuffer, {
            contentType: 'image/png',
            upsert: true,
          });

        if (storageError) {
          console.error('Ошибка загрузки в storage:', storageError);
          return null;
        }

        // Получаем публичный URL
        const {
          data: { publicUrl },
        } = supabase.storage.from('images').getPublicUrl(fileName);

        // Сохраняем данные в таблицу
        const { data: dbData, error: dbError } = await supabase
          .from('assets')
          .insert([
            {
              project_id: projectId,
              storage_path: fileName,
              public_url: publicUrl,
              type: type,
              trigger_word: triggerWord,
              text: text,
            },
          ])
          .select('id')
          .single();

        if (dbError) {
          console.error('Ошибка сохранения в БД:', dbError);
          return null;
        }

        return {
          url: publicUrl,
          id: dbData.id,
        };
      })
    );

    return results.filter(
      (result): result is { readonly url: string; readonly id: string } =>
        result !== null
    );
  } catch (error) {
    console.error('Ошибка в saveImagesToSupabase:', error);
    return [];
  }
}
