import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_KEY, SUPABASE_SERVICE_ROLE_KEY } from '../../config';

// Создаем клиент с service role key
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export * from './createModelTraining';
export * from './checkSubscriptionByTelegramId';
export * from './updateUserBalance';
export * from './getAspectRatio';
export * from './getGeneratedImages';
export * from './getHistory';
export * from './getModel';
export * from './getPrompt';
export * from './getUserData';
export * from './incrementGeneratedImages';
export * from './isLimitAi';
export * from './savePrompt';
export * from './setAspectRatio';
export * from './getUid';
export * from './getUserBalance';
export * from './updateUserVoice';
export * from './getUserModel';
export * from './getReferalsCount';
export * from './cleanupOldArchives';
export * from './deleteFileFromSupabase';
export * from './ensureSupabaseAuth';
export * from './getTelegramIdByUserId';
export * from './getVoiceId';
export * from './saveUserEmail';
export * from './sendPaymentInfo';
export * from './getPaymentsInfoByUsername';
export * from './getPaymentsInfoByTelegramId';
export * from './setModel';
export * from './updateModelTraining';
export * from './updateUserSoul';
export * from './getUserByTelegramId';
export * from './incrementBalance';
export * from './saveFileLinkToSupabase';
export * from './setSyncLabsVideo';
export * from './updateResult';
export * from './setPayments';
