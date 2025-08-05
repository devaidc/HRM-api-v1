import { CreateLogRequest, Log, ProximityResult } from '../types';
export declare class AttendanceService {
    private logRepository;
    private locationRepository;
    constructor();
    createLog(userId: number, logData: CreateLogRequest, companyId?: number): Promise<Log>;
    getUserLogs(userId: number): Promise<Log[]>;
    getTodayLogs(userId: number): Promise<Log[]>;
    getLogsByLocation(locationId: number): Promise<Log[]>;
    getLogsByCompany(companyId: number): Promise<Log[]>;
    checkProximity(latitude: number, longitude: number, companyId: number): Promise<ProximityResult | null>;
}
//# sourceMappingURL=attendanceService.d.ts.map