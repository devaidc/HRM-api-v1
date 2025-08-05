"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const attendanceService_1 = require("../services/attendanceService");
class AttendanceController {
    constructor() {
        this.attendanceService = new attendanceService_1.AttendanceService();
    }
    async createLog(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }
            const logData = req.body;
            const { type, latitude, longitude } = logData;
            if (!type || latitude === undefined || longitude === undefined) {
                res.status(400).json({
                    error: 'type, latitude, and longitude are required'
                });
                return;
            }
            const result = await this.attendanceService.createLog(req.user.id, logData, req.user.companyId);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async getUserLogs(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }
            const logs = await this.attendanceService.getUserLogs(req.user.id);
            res.json(logs);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getTodayLogs(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }
            const logs = await this.attendanceService.getTodayLogs(req.user.id);
            res.json(logs);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async checkProximity(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }
            if (!req.user.companyId) {
                res.status(400).json({ error: 'User is not associated with any company' });
                return;
            }
            const { latitude, longitude } = req.body;
            if (latitude === undefined || longitude === undefined) {
                res.status(400).json({ error: 'latitude and longitude are required' });
                return;
            }
            const proximityResult = await this.attendanceService.checkProximity(latitude, longitude, req.user.companyId);
            if (proximityResult) {
                res.json({
                    location: proximityResult.location,
                    distance: proximityResult.distance,
                    isWithinThreshold: proximityResult.isWithinThreshold
                });
            }
            else {
                res.json({
                    location: null,
                    distance: null,
                    isWithinThreshold: false,
                    message: 'No nearby office locations found'
                });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.AttendanceController = AttendanceController;
//# sourceMappingURL=attendanceController.js.map