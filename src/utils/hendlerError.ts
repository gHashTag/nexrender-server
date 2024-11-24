/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-class */
// Создать общий ErrorHandler
export class AppError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly details?: unknown
  ) {
    super(message);
  }
}

// Создать утилиту для обработки ошибок
export const handleError = (error: unknown, context: string): never => {
  console.error(`Ошибка в ${context}:`, error);
  if (error instanceof AppError) {
    throw error;
  } else {
    throw new AppError('Неизвестная ошибка', 'UNKNOWN_ERROR', error);
  }
};
