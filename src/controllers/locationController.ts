import { Request, Response } from 'express';
import { LocationService } from '../services/locationService';
import { CreateLocationRequest, AuthenticatedRequest } from '../types';

export class LocationController {
  private locationService: LocationService;

  constructor() {
    this.locationService = new LocationService();
  }

  async createLocation(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const locationData: CreateLocationRequest = req.body;
      const { name, latitude, longitude, proximityThreshold } = locationData;

      if (!name || latitude === undefined || longitude === undefined) {
        res.status(400).json({ 
          error: 'name, latitude, and longitude are required' 
        });
        return;
      }

      const result = await this.locationService.createLocation(req.user.id, locationData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getLocationById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid location ID' });
        return;
      }

      const result = await this.locationService.getLocationById(id);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getLocationsByUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const result = await this.locationService.getLocationsByUser(req.user.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateLocation(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const locationData = req.body;

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid location ID' });
        return;
      }

      const result = await this.locationService.updateLocation(id, locationData);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async toggleLocationActive(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid location ID' });
        return;
      }

      const result = await this.locationService.toggleLocationActive(id);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async deleteLocation(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid location ID' });
        return;
      }

      const result = await this.locationService.deleteLocation(id);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
} 