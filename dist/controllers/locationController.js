"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationController = void 0;
const locationService_1 = require("../services/locationService");
class LocationController {
    constructor() {
        this.locationService = new locationService_1.LocationService();
    }
    async createLocation(req, res) {
        try {
            if (!req.user?.companyId) {
                res.status(400).json({ error: 'User is not associated with any company' });
                return;
            }
            const locationData = req.body;
            const { name, latitude, longitude, proximityThreshold } = locationData;
            if (!name || latitude === undefined || longitude === undefined) {
                res.status(400).json({
                    error: 'name, latitude, and longitude are required'
                });
                return;
            }
            const result = await this.locationService.createLocation(req.user.companyId, locationData);
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
    async getLocationById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid location ID' });
                return;
            }
            const result = await this.locationService.getLocationById(id);
            res.json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async getLocationsByCompany(req, res) {
        try {
            if (!req.user?.companyId) {
                res.status(400).json({ error: 'User is not associated with any company' });
                return;
            }
            const result = await this.locationService.getLocationsByCompany(req.user.companyId);
            res.json(result);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async updateLocation(req, res) {
        try {
            const id = parseInt(req.params.id);
            const locationData = req.body;
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid location ID' });
                return;
            }
            const result = await this.locationService.updateLocation(id, locationData);
            res.json(result);
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
    async toggleLocationActive(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid location ID' });
                return;
            }
            const result = await this.locationService.toggleLocationActive(id);
            res.json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async deleteLocation(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid location ID' });
                return;
            }
            const result = await this.locationService.deleteLocation(id);
            res.json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
exports.LocationController = LocationController;
//# sourceMappingURL=locationController.js.map