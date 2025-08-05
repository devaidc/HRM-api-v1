import { Request, Response } from 'express';
import { AttendanceService } from '../services/attendanceService';
import { CreateLogRequest, AuthenticatedRequest } from '../types';

export class AttendanceController {
  private attendanceService: AttendanceService;

  constructor() {
    this.attendanceService = new AttendanceService();
  }

  async createLog(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const logData = req.body as CreateLogRequest;
      const { type, latitude, longitude } = logData;

      if (!type || latitude === undefined || longitude === undefined) {
        res.status(400).json({ 
          error: 'type, latitude, and longitude are required' 
        });
        return;
      }

      const result = await this.attendanceService.createLog(req.user.id, logData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getUserLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const logs = await this.attendanceService.getUserLogs(req.user.id);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getTodayLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const logs = await this.attendanceService.getTodayLogs(req.user.id);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async checkProximity(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const { latitude, longitude } = req.body;

      if (latitude === undefined || longitude === undefined) {
        res.status(400).json({ error: 'latitude and longitude are required' });
        return;
      }

      const proximityResult = await this.attendanceService.checkProximity(latitude, longitude, req.user.id);
      
      if (proximityResult.withinThreshold) {
        const location = proximityResult.withinThreshold.location;
        res.json({
          location: location,
          distance: proximityResult.withinThreshold.distance,
          isWithinThreshold: true,
          officeHours: location.officeHoursStart && location.officeHoursEnd 
            ? `${location.officeHoursStart} - ${location.officeHoursEnd}`
            : null
        });
      } else if (proximityResult.nearest) {
        const distanceOutside = proximityResult.nearest.distance - proximityResult.nearest.location.proximityThreshold;
        const location = proximityResult.nearest.location;
        res.json({
          location: location,
          distance: proximityResult.nearest.distance,
          isWithinThreshold: false,
          distanceOutside: distanceOutside,
          officeHours: location.officeHoursStart && location.officeHoursEnd 
            ? `${location.officeHoursStart} - ${location.officeHoursEnd}`
            : null,
          message: `อยู่นอกระยะ ${Math.round(distanceOutside)} เมตร`
        });
      } else {
        res.json({
          location: null,
          distance: null,
          isWithinThreshold: false,
          officeHours: null,
          message: 'ไม่พบสถานที่ใกล้เคียง'
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 