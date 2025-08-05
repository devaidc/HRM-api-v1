import { Router } from 'express';
import { LocationController } from '../controllers/locationController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();
const locationController = new LocationController();

// All location routes require authentication
router.use(authenticateToken);

// GET /locations - Get locations for user
router.get('/', (req, res) => locationController.getLocationsByUser(req, res));

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

export default router; 