import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimiter } from './config/rateLimit';
import { csrfProtection } from './config/csrf';
import { logger } from './config/logger';
import { prisma } from './database/client';
import { authenticate } from './middleware/auth';
import { validateEnv } from './config/env';

validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(rateLimiter);
app.use(csrfProtection);

// Database Connection
prisma.$connect()
  .then(() => logger.info('Connected to database'))
  .catch((err) => logger.error('Database connection failed', err));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Protected Route
app.get('/api/users/me', authenticate, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true, role: true }
  });
  res.json(user);
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});