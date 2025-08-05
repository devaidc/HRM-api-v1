"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const logRepository_1 = require("../repositories/logRepository");
const locationRepository_1 = require("../repositories/locationRepository");
const geoUtils_1 = require("../utils/geoUtils");
class AttendanceService {
    constructor() {
        this.logRepository = new logRepository_1.LogRepository();
        this.locationRepository = new locationRepository_1.LocationRepository();
    }
    async createLog(userId, logData, companyId) {
        // Validate log data
        if (!['in', 'out'].includes(logData.type)) {
            throw new Error('Invalid log type. Must be "in" or "out"');
        }
        if (!(0, geoUtils_1.validateCoordinates)(logData.latitude, logData.longitude)) {
            throw new Error('Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180');
        }
        // Generate current UTC+7 timestamp
        const now = new Date();
        const utcPlus7 = new Date(now.getTime() + (7 * 60 * 60 * 1000));
        const currentTimestamp = utcPlus7.toISOString();
        // Create log data with current UTC+7 timestamp
        const logDataWithTimestamp = {
            ...logData,
            timestamp: currentTimestamp
        };
        // Check for duplicate logs within a short time window (5 minutes)
        const recentLogs = await this.logRepository.findTodayByUserId(userId);
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const recentLog = recentLogs.find(log => log.type === logData.type &&
            new Date(log.timestamp) > fiveMinutesAgo);
        if (recentLog) {
            throw new Error(`Recent ${logData.type} log already exists`);
        }
        // Determine location based on proximity
        let locationId = logData.locationId;
        if (!locationId && companyId) {
            // Auto-detect location based on proximity
            const companyLocations = await this.locationRepository.findActiveByCompanyId(companyId);
            const nearestLocation = (0, geoUtils_1.findNearestLocation)(logData.latitude, logData.longitude, companyLocations);
            if (nearestLocation) {
                locationId = nearestLocation.location.id;
            }
        }
        return this.logRepository.create(userId, logDataWithTimestamp, locationId);
    }
    async getUserLogs(userId) {
        return this.logRepository.findByUserId(userId);
    }
    async getTodayLogs(userId) {
        return this.logRepository.findTodayByUserId(userId);
    }
    async getLogsByLocation(locationId) {
        return this.logRepository.findByLocationId(locationId);
    }
    async getLogsByCompany(companyId) {
        return this.logRepository.findByCompanyId(companyId);
    }
    async checkProximity(latitude, longitude, companyId) {
        const companyLocations = await this.locationRepository.findActiveByCompanyId(companyId);
        return (0, geoUtils_1.findNearestLocation)(latitude, longitude, companyLocations);
    }
}
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendanceService.js.map