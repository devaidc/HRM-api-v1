"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
const authController = new authController_1.AuthController();
// POST /login
router.post('/login', (req, res) => authController.login(req, res));
// POST /register
router.post('/register', (req, res) => authController.register(req, res));
// POST /assign-company
router.post('/assign-company', (req, res) => authController.assignUserToCompany(req, res));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map