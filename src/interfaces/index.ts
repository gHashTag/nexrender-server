/**
 * 🕉️ Interfaces - Type definitions for the application
 * "व्यवसायात्मिका बुद्धिः" - "Discriminative intelligence"
 */

export interface MyContext {
  // Placeholder for context interface
  [key: string]: any;
}

export interface Step {
  step: number;
  details: {
    en: string;
    [key: string]: string;
  };
  imagePath?: string;
}
