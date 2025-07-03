/**
 * 🕉️ Meditation Steps Interface
 * "ध्यान परमो धर्मः" - "Meditation is the supreme dharma"
 */

export interface Step {
  step: number;
  details: {
    en: string;
    [key: string]: string;
  };
  imagePath?: string;
}
