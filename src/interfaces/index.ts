/**
 * 🕉️ Interfaces - Type definitions for the application
 * "व्यवसायात्मिका बुद्धिः" - "Discriminative intelligence"
 */

export interface MyContext {
  // Placeholder for context interface
  [key: string]: any;
}

export interface MyTextMessageContext {
  // Placeholder for text message context
  [key: string]: any;
}

export interface MyWizardSession {
  // Placeholder for wizard session
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
