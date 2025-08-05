import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
export declare class AttendanceController {
    private attendanceService;
    constructor();
    createLog(req: AuthenticatedRequest, res: Response): Promise<void>;
    getUserLogs(req: AuthenticatedRequest, res: Response): Promise<void>;
    getTodayLogs(req: AuthenticatedRequest, res: Response): Promise<void>;
    checkProximity(req: AuthenticatedRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=attendanceController.d.ts.map