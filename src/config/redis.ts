// config/redis.ts
import Redis from 'ioredis';

export const redis = new Redis(process.env.REDIS_URL!);

// استخدام في middleware
const cachedUser = await redis.get(`user:${userId}`);