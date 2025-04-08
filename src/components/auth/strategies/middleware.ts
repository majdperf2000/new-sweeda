import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/client.ts';
import { logger } from '../config/logger.js';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken;
  
  if (!token) {
    logger.warn('Unauthorized access attempt');
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, activeSessionId: true }
    });

    if (!user || !user.activeSessionId) {
      throw new Error('Invalid user session');
    }

    req.userId = user.id;
    next();
  } catch (err) {
    logger.error(`Authentication failed: ${err.message}`);
    res.clearCookie('authToken');
    res.status(401).json({ message: 'Invalid token' });
  }
};