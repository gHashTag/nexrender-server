import { getUid } from '.';
import { supabase } from '.';

export const setSyncLabsVideo = async (telegram_id: string, videoId: string, is_ru: boolean) => {
  try {
    const userId = await getUid(telegram_id);

    console.log(userId, 'userId');

    if (!userId) {
      console.error('User not found');
      return;
    }

    await supabase.from('synclabs_videos').insert({
      user_id: userId,
      video_id: videoId,
      status: 'PENDING',
      is_ru: is_ru,
      telegram_id,
    });
  } catch (error) {
    console.error('Error setting sync labs video:', error);
  }
};
