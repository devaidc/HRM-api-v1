import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();
const authController = new AuthController();

// POST /login
router.post('/login', (req, res) => authController.login(req, res));

// POST /register
router.post('/register', (req, res) => authController.register(req, res));

// POST /assign-company
router.post('/assign-company', (req, res) => authController.assignUserToCompany(req, res));

// GET /me - Get current user info (requires authentication)
router.get('/me', authenticateToken, (req, res) => authController.getCurrentUser(req, res));

export default router; 