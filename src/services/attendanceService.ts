import { LogRepository } from '../repositories/logRepository';
import { LocationRepository } from '../repositories/locationRepository';
import { CreateLogRequest, Log, ProximityResult } from '../types';
import { validateCoordinates, findNearestLocation, findNearestLocationAny } from '../utils/geoUtils';

export class AttendanceService {
  private logRepository: LogRepository;
  private locationRepository: LocationRepository;

  constructor() {
    this.logRepository = new LogRepository();
    this.locationRepository = new LocationRepository();
  }

  async createLog(userId: number, logData: CreateLogRequest): Promise<Log> {
    // Validate log data
    if (!['in', 'out'].includes(logData.type)) {
      throw new Error('Invalid log type. Must be "in" or "out"');
    }

    if (!validateCoordinates(logData.latitude, logData.longitude)) {
      throw new Error('Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180');
    }

    // Generate current UTC+7 timestamp
    const now = new Date();
    const utcPlus7 = new Date(now.getTime() + (7 * 60 * 60 * 1000));
    const currentTimestamp = utcPlus7.toISOString();

    // Create log data with current UTC+7 timestamp
    const logDataWithTimestamp = {
      ...logData,
      timestamp: currentTimestamp
    };

    // Check for duplicate logs within a short time window (5 minutes)
    const recentLogs = await this.logRepository.findTodayByUserId(userId);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const recentLog = recentLogs.find(log => 
      log.type === logData.type && 
      new Date(log.timestamp) > fiveMinutesAgo
    );

    if (recentLog) {
      throw new Error(`Recent ${logData.type} log already exists`);
    }

    // Determine location based on proximity
    let locationId = logData.locationId;
    
    if (!locationId) {
      // Auto-detect location based on proximity to user's locations
      const userLocations = await this.locationRepository.findActiveByUserId(userId);
      const nearestLocation = findNearestLocation(logData.latitude, logData.longitude, userLocations);
      
      if (nearestLocation) {
        locationId = nearestLocation.location.id;
      }
    }

    return this.logRepository.create(userId, logDataWithTimestamp, locationId);
  }

  async getUserLogs(userId: number): Promise<Log[]> {
    return this.logRepository.findByUserId(userId);
  }

  async getTodayLogs(userId: number): Promise<Log[]> {
    return this.logRepository.findTodayByUserId(userId);
  }

  async getLogsByLocation(locationId: number): Promise<Log[]> {
    return this.logRepository.findByLocationId(locationId);
  }

  async checkProximity(latitude: number, longitude: number, userId: number): Promise<{ withinThreshold: ProximityResult | null; nearest: ProximityResult | null }> {
    const userLocations = await this.locationRepository.findActiveByUserId(userId);
    const withinThreshold = findNearestLocation(latitude, longitude, userLocations);
    const nearest = findNearestLocationAny(latitude, longitude, userLocations);
    
    return { withinThreshold, nearest };
  }
} 