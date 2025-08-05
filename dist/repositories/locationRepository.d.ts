import { Location, CreateLocationRequest } from '../types';
export declare class LocationRepository {
    create(companyId: number, locationData: CreateLocationRequest): Promise<Location>;
    findById(id: number): Promise<Location | null>;
    findByCompanyId(companyId: number): Promise<Location[]>;
    findActiveByCompanyId(companyId: number): Promise<Location[]>;
    update(id: number, locationData: Partial<CreateLocationRequest>): Promise<Location>;
    toggleActive(id: number): Promise<Location>;
    delete(id: number): Promise<Location>;
}
//# sourceMappingURL=locationRepository.d.ts.map