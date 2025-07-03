/**
 * 🕉️ Neurobroker helpers index
 * "ज्ञानं परं बलम्" - "Knowledge is supreme power"
 */

import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../config';

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
