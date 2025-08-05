"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogRepository = void 0;
const database_1 = require("../utils/database");
class LogRepository {
    async create(userId, logData, locationId) {
        const result = await database_1.prisma.log.create({
            data: {
                userId,
                locationId,
                type: logData.type,
                latitude: logData.latitude,
                longitude: logData.longitude,
                timestamp: logData.timestamp ? new Date(logData.timestamp) : new Date()
            },
            include: {
                user: true,
                location: true
            }
        });
        return result;
    }
    async findByUserId(userId) {
        const results = await database_1.prisma.log.findMany({
            where: { userId },
            include: {
                location: true
            },
            orderBy: { timestamp: 'desc' }
        });
        return results;
    }
    async findTodayByUserId(userId) {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        const results = await database_1.prisma.log.findMany({
            where: {
                userId,
                timestamp: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            include: {
                location: true
            },
            orderBy: { timestamp: 'desc' }
        });
        return results;
    }
    async findByLocationId(locationId) {
        const results = await database_1.prisma.log.findMany({
            where: { locationId },
            include: {
                user: true,
                location: true
            },
            orderBy: { timestamp: 'desc' }
        });
        return results;
    }
    async findByCompanyId(companyId) {
        const results = await database_1.prisma.log.findMany({
            where: {
                location: {
                    companyId
                }
            },
            include: {
                user: true,
                location: true
            },
            orderBy: { timestamp: 'desc' }
        });
        return results;
    }
}
exports.LogRepository = LogRepository;
//# sourceMappingURL=logRepository.js.map