import { prisma } from '../utils/database';
import { Log, CreateLogRequest } from '../types';
import { log } from 'console';

export class LogRepository {
  async create(userId: number, logData: CreateLogRequest, locationId?: number): Promise<Log> {
    const result = await prisma.log.create({
      data: {
        userId,
        locationId,
        type: logData.type,
        latitude: logData.latitude,
        longitude: logData.longitude,
        timestamp: logData.timestamp ? new Date(logData.timestamp) : new Date()
      },
      include: {
        user: true,
        location: true
      }
    });

    return result as unknown as Log;
  }

  async findByUserId(userId: number): Promise<Log[]> {
    const results = await prisma.log.findMany({
      where: { userId },
      include: {
        location: true
      },
      orderBy: { timestamp: 'desc' }
    });

    return results as unknown as Log[];
  }

  async findTodayByUserId(userId: number): Promise<Log[]> {
    // Get current date in UTC+7 timezone
    const utcNow = new Date();
    const utcPlus7Offset = 7 * 60; // 7 hours in minutes
    const today = new Date(utcNow.getTime() + (utcPlus7Offset * 60 * 1000));
    
    // Create start and end of day in UTC+7
    const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59));
    // console.log('UTC+7 Start of day:', startOfDay.toISOString(), 'End of day:', endOfDay.toISOString());
    const results = await prisma.log.findMany({
      where: {
        userId,
        timestamp: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      include: {
        location: true
      },
      orderBy: { timestamp: 'desc' }
    });

    return results as unknown as Log[];
  }

  async findByLocationId(locationId: number): Promise<Log[]> {
    const results = await prisma.log.findMany({
      where: { locationId },
      include: {
        user: true,
        location: true
      },
      orderBy: { timestamp: 'desc' }
    });

    return results as unknown as Log[];
  }
} 