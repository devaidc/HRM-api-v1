import { Request } from 'express';

export interface User {
  id: number;
  username: string;
  password: string;
  companyId?: number;
  company?: Company;
  logs?: Log[];
  locations?: Location[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: number;
  name: string;
  users?: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: number;
  name: string;
  userId: number;
  user?: User;
  latitude: number;
  longitude: number;
  proximityThreshold: number; // meters
  isActive: boolean;
  officeHoursStart?: string; // Format: "HH:MM" (e.g., "08:00")
  officeHoursEnd?: string; // Format: "HH:MM" (e.g., "16:00")
  logs?: Log[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Log {
  id: number;
  userId: number;
  locationId?: number;
  type: 'in' | 'out';
  latitude: number;
  longitude: number;
  timestamp: Date;
  createdAt: Date;
  user?: User;
  location?: Location;
}

export interface CreateLogRequest {
  type: 'in' | 'out';
  latitude: number;
  longitude: number;
  timestamp?: string; // Optional - will be generated automatically as UTC+7
  locationId?: number; // Optional - will be auto-detected based on proximity
}

export interface CreateLocationRequest {
  name: string;
  latitude: number;
  longitude: number;
  proximityThreshold?: number; // meters, defaults to 100
  officeHoursStart?: string; // Format: "HH:MM" (e.g., "08:00")
  officeHoursEnd?: string; // Format: "HH:MM" (e.g., "16:00")
}

export interface CreateCompanyRequest {
  name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    companyId?: number;
    company?: {
      id: number;
      name: string;
    };
  };
}

export interface JwtPayload {
  userId: number;
  username: string;
  companyId?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    companyId?: number;
  };
}

export interface ProximityResult {
  location: Location;
  distance: number; // meters
  isWithinThreshold: boolean;
} 