import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { logger } from './logger.ts';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100,
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({ message: 'Too many requests' });
  },
  skip: (req: Request) => req.ip === '127.0.0.1' // استثناء localhost
});