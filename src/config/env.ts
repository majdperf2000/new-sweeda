import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  CSRF_SECRET: z.string().min(32),
  CLIENT_URL: z.string().url().default('http://localhost:3000'),
  REDIS_URL: z.string().optional()
});

export const validateEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (err) {
    console.error('Environment validation failed:', err);
    process.exit(1);
  }
};