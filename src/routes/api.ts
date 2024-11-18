import { Request, Response } from 'express';

import handler from '../lib/server';

// Использование в Express маршруте
export const nexrenderRoute = (req: Request, res: Response) => {
  return handler(req, res);
};
