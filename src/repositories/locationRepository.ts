import { prisma } from '../utils/database';
import { Location, CreateLocationRequest } from '../types';

export class LocationRepository {
  async create(userId: number, locationData: CreateLocationRequest): Promise<Location> {
    return prisma.location.create({
      data: {
        userId,
        name: locationData.name,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        proximityThreshold: locationData.proximityThreshold || 100,
        officeHoursStart: locationData.officeHoursStart,
        officeHoursEnd: locationData.officeHoursEnd
      },
      include: {
        user: true
      }
    }) as unknown as Location;
  }

  async findById(id: number): Promise<Location | null> {
    const result = await prisma.location.findUnique({
      where: { id },
      include: {
        user: true,
        logs: true
      }
    });
    
    return result as unknown as Location | null;
  }

  async findByUserId(userId: number): Promise<Location[]> {
    const results = await prisma.location.findMany({
      where: { 
        userId,
        isActive: true
      },
      include: {
        user: true
      }
    });
    
    return results as unknown as Location[];
  }

  async findActiveByUserId(userId: number): Promise<Location[]> {
    const results = await prisma.location.findMany({
      where: { 
        userId,
        isActive: true
      }
    });
    
    return results as unknown as Location[];
  }

  async update(id: number, locationData: Partial<CreateLocationRequest>): Promise<Location> {
    return prisma.location.update({
      where: { id },
      data: locationData,
      include: {
        user: true
      }
    }) as unknown as Location;
  }

  async toggleActive(id: number): Promise<Location> {
    const location = await this.findById(id);
    if (!location) {
      throw new Error('Location not found');
    }

    return prisma.location.update({
      where: { id },
      data: { isActive: !location.isActive },
      include: {
        user: true
      }
    }) as unknown as Location;
  }

  async delete(id: number): Promise<Location> {
    return prisma.location.delete({
      where: { id },
      include: {
        user: true
      }
    }) as unknown as Location;
  }
} 