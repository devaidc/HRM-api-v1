"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceController_1 = require("../controllers/attendanceController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const attendanceController = new attendanceController_1.AttendanceController();
// All attendance routes require authentication
router.use(authMiddleware_1.authenticateToken);
// POST /attendance
router.post('/', (req, res) => attendanceController.createLog(req, res));
// GET /attendance
router.get('/', (req, res) => attendanceController.getUserLogs(req, res));
// GET /attendance/today
router.get('/today', (req, res) => attendanceController.getTodayLogs(req, res));
// POST /attendance/proximity - Check proximity to office locations
router.post('/proximity', (req, res) => attendanceController.checkProximity(req, res));
exports.default = router;
//# sourceMappingURL=attendanceRoutes.js.map