import { Request } from 'express';
export interface User {
    id: number;
    username: string;
    password: string;
    companyId?: number;
    company?: Company;
    createdAt: Date;
    updatedAt: Date;
}
export interface Company {
    id: number;
    name: string;
    users?: User[];
    locations?: Location[];
    createdAt: Date;
    updatedAt: Date;
}
export interface Location {
    id: number;
    name: string;
    companyId: number;
    company?: Company;
    latitude: number;
    longitude: number;
    proximityThreshold: number;
    isActive: boolean;
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
    timestamp?: string;
    locationId?: number;
}
export interface CreateLocationRequest {
    name: string;
    latitude: number;
    longitude: number;
    proximityThreshold?: number;
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
    distance: number;
    isWithinThreshold: boolean;
}
//# sourceMappingURL=index.d.ts.map