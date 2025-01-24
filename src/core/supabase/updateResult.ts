import { supabase } from '.';

export const updateResult = async (id: string, outputUrl: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from('synclabs_videos')
      .update({
        video_url: outputUrl,
        status: status,
      })
      .eq('video_id', id);

    return { data, error };
  } catch (error) {
    console.error('Error updating result:', error);
    return { data: null, error };
  }
};
