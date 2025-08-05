import { Router } from 'express';
import { AttendanceController } from '../controllers/attendanceController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();
const attendanceController = new AttendanceController();

// All attendance routes require authentication
router.use(authenticateToken);

// POST /attendance
router.post('/', (req, res) => attendanceController.createLog(req, res));

// GET /attendance
router.get('/', (req, res) => attendanceController.getUserLogs(req, res));

// GET /attendance/today
router.get('/today', (req, res) => attendanceController.getTodayLogs(req, res));

// POST /attendance/proximity - Check proximity to office locations
router.post('/proximity', (req, res) => attendanceController.checkProximity(req, res));

export default router; 