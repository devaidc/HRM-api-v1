"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRepository = void 0;
const database_1 = require("../utils/database");
class LocationRepository {
    async create(companyId, locationData) {
        return database_1.prisma.location.create({
            data: {
                companyId,
                name: locationData.name,
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                proximityThreshold: locationData.proximityThreshold || 100
            }
        });
    }
    async findById(id) {
        const result = await database_1.prisma.location.findUnique({
            where: { id },
            include: {
                company: true,
                logs: true
            }
        });
        return result;
    }
    async findByCompanyId(companyId) {
        const results = await database_1.prisma.location.findMany({
            where: {
                companyId,
                isActive: true
            },
            include: {
                company: true
            }
        });
        return results;
    }
    async findActiveByCompanyId(companyId) {
        const results = await database_1.prisma.location.findMany({
            where: {
                companyId,
                isActive: true
            }
        });
        return results;
    }
    async update(id, locationData) {
        return database_1.prisma.location.update({
            where: { id },
            data: locationData
        });
    }
    async toggleActive(id) {
        const location = await this.findById(id);
        if (!location) {
            throw new Error('Location not found');
        }
        return database_1.prisma.location.update({
            where: { id },
            data: { isActive: !location.isActive }
        });
    }
    async delete(id) {
        return database_1.prisma.location.delete({
            where: { id }
        });
    }
}
exports.LocationRepository = LocationRepository;
//# sourceMappingURL=locationRepository.js.map