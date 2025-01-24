import { BOT_TOKEN } from '@/config';
import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

import { Telegraf } from 'telegraf';

// Явно указываем тип Telegraf для переменной bot
const bot: Telegraf = new Telegraf(BOT_TOKEN);

export default bot;
