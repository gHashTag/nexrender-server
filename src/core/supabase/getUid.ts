import { supabase } from '.';

export const getUid = async (telegram_id: string | number): Promise<string | null> => {
  try {
    if (!telegram_id) {
      console.warn('No telegram_id provided to getUid');
      return null;
    }

    const { data, error } = await supabase.from('users').select('user_id').eq('telegram_id', telegram_id.toString()).maybeSingle();

    if (error) {
      console.error('Error getting user_id:', error);
      return null;
    }

    return data?.user_id || null;
  } catch (error) {
    console.error('Error in getUid:', error);
    return null;
  }
};
