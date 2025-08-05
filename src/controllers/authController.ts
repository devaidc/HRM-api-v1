import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { LoginRequest, AuthenticatedRequest } from '../types';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password }: LoginRequest = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
        return;
      }

      const result = await this.authService.login({ username, password });
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, companyId } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({ error: 'Password must be at least 6 characters long' });
        return;
      }

      const result = await this.authService.register(username, password, companyId);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async assignUserToCompany(req: Request, res: Response): Promise<void> {
    try {
      const { userId, companyId } = req.body;

      if (!userId || !companyId) {
        res.status(400).json({ error: 'User ID and Company ID are required' });
        return;
      }

      const result = await this.authService.assignUserToCompany(userId, companyId);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getCurrentUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      // The user data is already attached to the request by the auth middleware
      const user = req.user;
      
      if (!user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      // Get fresh user data from database
      const currentUser = await this.authService.getCurrentUser(user.id);
      
      if (!currentUser) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      res.json(currentUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
} 