import { getUid } from '.';
import { supabase } from '.';

export const saveFileLinkToSupabase = async (telegramId: number, filePath: string, type: string) => {
  try {
    const userId = await getUid(telegramId);
    const { error } = await supabase.from('user_files').insert({
      user_id: userId,
      file_path: filePath,
      type: type,
    });

    if (error) {
      console.error('Ошибка при сохранении ссылки на файл в Supabase:', error);
    }
  } catch (error) {
    console.error('Ошибка при сохранении ссылки на файл в Supabase:', error);
  }
};
