"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locationController_1 = require("../controllers/locationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const locationController = new locationController_1.LocationController();
// All location routes require authentication
router.use(authMiddleware_1.authenticateToken);
// GET /locations - Get locations for user's company
router.get('/', (req, res) => locationController.getLocationsByCompany(req, res));
// POST /locations - Create a new location
router.post('/', (req, res) => locationController.createLocation(req, res));
// GET /locations/:id - Get location by ID
router.get('/:id', (req, res) => locationController.getLocationById(req, res));
// PUT /locations/:id - Update location
router.put('/:id', (req, res) => locationController.updateLocation(req, res));
// PATCH /locations/:id/toggle - Toggle location active status
router.patch('/:id/toggle', (req, res) => locationController.toggleLocationActive(req, res));
// DELETE /locations/:id - Delete location
router.delete('/:id', (req, res) => locationController.deleteLocation(req, res));
exports.default = router;
//# sourceMappingURL=locationRoutes.js.map