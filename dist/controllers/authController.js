"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    constructor() {
        this.authService = new authService_1.AuthService();
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }
            const result = await this.authService.login({ username, password });
            res.json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async register(req, res) {
        try {
            const { username, password, companyId } = req.body;
            if (!username || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }
            if (password.length < 6) {
                res.status(400).json({ error: 'Password must be at least 6 characters long' });
                return;
            }
            const result = await this.authService.register(username, password, companyId);
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
    async assignUserToCompany(req, res) {
        try {
            const { userId, companyId } = req.body;
            if (!userId || !companyId) {
                res.status(400).json({ error: 'User ID and Company ID are required' });
                return;
            }
            const result = await this.authService.assignUserToCompany(userId, companyId);
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
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map