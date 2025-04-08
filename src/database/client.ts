// database/client.ts
import { PrismaClient } from '@prisma/client';

const shards = [
  new PrismaClient({ datasources: { db: { url: process.env.SHARD1_URL } } }),
  new PrismaClient({ datasources: { db: { url: process.env.SHARD2_URL } } })
];

export const getShard = (userId: string) => 
  shards[userId.charCodeAt(0) % shards.length];