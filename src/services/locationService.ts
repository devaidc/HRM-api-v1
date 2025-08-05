import { LocationRepository } from '../repositories/locationRepository';
import { CreateLocationRequest, Location } from '../types';
import { validateCoordinates } from '../utils/geoUtils';

export class LocationService {
  private locationRepository: LocationRepository;

  constructor() {
    this.locationRepository = new LocationRepository();
  }

  async createLocation(userId: number, locationData: CreateLocationRequest): Promise<Location> {
    if (!validateCoordinates(locationData.latitude, locationData.longitude)) {
      throw new Error('Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180');
    }

    if (locationData.proximityThreshold && locationData.proximityThreshold <= 0) {
      throw new Error('Proximity threshold must be greater than 0');
    }

    return this.locationRepository.create(userId, locationData);
  }

  async getLocationById(id: number): Promise<Location> {
    const location = await this.locationRepository.findById(id);
    
    if (!location) {
      throw new Error('Location not found');
    }

    return location;
  }

  async getLocationsByUser(userId: number): Promise<Location[]> {
    return this.locationRepository.findByUserId(userId);
  }

  async updateLocation(id: number, locationData: Partial<CreateLocationRequest>): Promise<Location> {
    if (locationData.latitude !== undefined || locationData.longitude !== undefined) {
      const lat = locationData.latitude ?? 0;
      const lon = locationData.longitude ?? 0;
      
      if (!validateCoordinates(lat, lon)) {
        throw new Error('Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180');
      }
    }

    if (locationData.proximityThreshold !== undefined && locationData.proximityThreshold <= 0) {
      throw new Error('Proximity threshold must be greater than 0');
    }

    return this.locationRepository.update(id, locationData);
  }

  async toggleLocationActive(id: number): Promise<Location> {
    return this.locationRepository.toggleActive(id);
  }

  async deleteLocation(id: number): Promise<Location> {
    return this.locationRepository.delete(id);
  }
} 