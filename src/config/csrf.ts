import { Request, Response, NextFunction } from 'express';
import csrf from 'csurf';
import { logger } from './logger.ts';

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

export const csrfMiddleware = (req: Request, res: Response, next: NextFunction) => {
  csrfProtection(req, res, (err) => {
    if (err) {
      logger.error(`CSRF Error: ${err.message}`);
      return res.status(403).json({ message: 'Invalid CSRF token' });
    }
    
    // Generate new token for next request
    res.locals.csrfToken = req.csrfToken();
    next();
  });
};