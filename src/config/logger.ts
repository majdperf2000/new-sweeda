import winston from 'winston';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'security.log', level: 'warn' }),
    new winston.transports.Console()
  ]
});

// Log to Database
export const dbLogger = {
  log: async (event: SecurityEvent) => {
    await prisma.securityLog.create({
      data: {
        eventType: event.eventType,
        userId: event.userId,
        ip: event.ip,
        userAgent: event.userAgent,
        metadata: event.metadata
      }
    });
  }
};

interface SecurityEvent {
  eventType: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  metadata?: object;
}