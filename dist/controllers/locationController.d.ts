import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types';
export declare class LocationController {
    private locationService;
    constructor();
    createLocation(req: AuthenticatedRequest, res: Response): Promise<void>;
    getLocationById(req: Request, res: Response): Promise<void>;
    getLocationsByCompany(req: AuthenticatedRequest, res: Response): Promise<void>;
    updateLocation(req: Request, res: Response): Promise<void>;
    toggleLocationActive(req: Request, res: Response): Promise<void>;
    deleteLocation(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=locationController.d.ts.map