import { CreateLocationRequest, Location } from '../types';
export declare class LocationService {
    private locationRepository;
    constructor();
    createLocation(companyId: number, locationData: CreateLocationRequest): Promise<Location>;
    getLocationById(id: number): Promise<Location>;
    getLocationsByCompany(companyId: number): Promise<Location[]>;
    updateLocation(id: number, locationData: Partial<CreateLocationRequest>): Promise<Location>;
    toggleLocationActive(id: number): Promise<Location>;
    deleteLocation(id: number): Promise<Location>;
}
//# sourceMappingURL=locationService.d.ts.map