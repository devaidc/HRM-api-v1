import { Log, CreateLogRequest } from '../types';
export declare class LogRepository {
    create(userId: number, logData: CreateLogRequest, locationId?: number): Promise<Log>;
    findByUserId(userId: number): Promise<Log[]>;
    findTodayByUserId(userId: number): Promise<Log[]>;
    findByLocationId(locationId: number): Promise<Log[]>;
    findByCompanyId(companyId: number): Promise<Log[]>;
}
//# sourceMappingURL=logRepository.d.ts.map