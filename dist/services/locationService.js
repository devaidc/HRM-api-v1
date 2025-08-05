"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const locationRepository_1 = require("../repositories/locationRepository");
const geoUtils_1 = require("../utils/geoUtils");
class LocationService {
    constructor() {
        this.locationRepository = new locationRepository_1.LocationRepository();
    }
    async createLocation(companyId, locationData) {
        if (!(0, geoUtils_1.validateCoordinates)(locationData.latitude, locationData.longitude)) {
            throw new Error('Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180');
        }
        if (locationData.proximityThreshold && locationData.proximityThreshold <= 0) {
            throw new Error('Proximity threshold must be greater than 0');
        }
        return this.locationRepository.create(companyId, locationData);
    }
    async getLocationById(id) {
        const location = await this.locationRepository.findById(id);
        if (!location) {
            throw new Error('Location not found');
        }
        return location;
    }
    async getLocationsByCompany(companyId) {
        return this.locationRepository.findByCompanyId(companyId);
    }
    async updateLocation(id, locationData) {
        if (locationData.latitude !== undefined || locationData.longitude !== undefined) {
            const lat = locationData.latitude ?? 0;
            const lon = locationData.longitude ?? 0;
            if (!(0, geoUtils_1.validateCoordinates)(lat, lon)) {
                throw new Error('Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180');
            }
        }
        if (locationData.proximityThreshold !== undefined && locationData.proximityThreshold <= 0) {
            throw new Error('Proximity threshold must be greater than 0');
        }
        return this.locationRepository.update(id, locationData);
    }
    async toggleLocationActive(id) {
        return this.locationRepository.toggleActive(id);
    }
    async deleteLocation(id) {
        return this.locationRepository.delete(id);
    }
}
exports.LocationService = LocationService;
//# sourceMappingURL=locationService.js.map