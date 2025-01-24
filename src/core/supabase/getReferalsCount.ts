import { supabase } from '.';

export const getReferalsCount = async (telegram_id: string) => {
  try {
    // Сначала получаем UUID пользователя
    const { data: userData, error: userError } = await supabase.from('users').select('user_id').eq('telegram_id', telegram_id.toString()).single();

    if (userError) {
      console.error('Ошибка при получении user_id:', userError);
      return 0;
    }

    // Теперь ищем рефералов по UUID
    const { data, error } = await supabase.from('users').select('inviter').eq('inviter', userData.user_id);

    if (error) {
      console.error('Ошибка при получении рефералов:', error);
      return 0;
    }

    return data?.length || 0;
  } catch (error) {
    console.error('Ошибка в getReferalsCount:', error);
    return 0;
  }
};
