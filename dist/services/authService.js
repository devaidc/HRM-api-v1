"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
class AuthService {
    constructor() {
        this.userRepository = new userRepository_1.UserRepository();
    }
    async login(loginData) {
        const user = await this.userRepository.findByUsername(loginData.username);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await (0, bcrypt_1.comparePassword)(loginData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            username: user.username,
            companyId: user.companyId
        });
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                companyId: user.companyId,
                company: user.company ? {
                    id: user.company.id,
                    name: user.company.name
                } : undefined
            }
        };
    }
    async register(username, password, companyId) {
        const existingUser = await this.userRepository.findByUsername(username);
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        const user = await this.userRepository.create(username, hashedPassword, companyId);
        return {
            id: user.id,
            username: user.username,
            companyId: user.companyId
        };
    }
    async assignUserToCompany(userId, companyId) {
        const user = await this.userRepository.updateCompany(userId, companyId);
        return {
            id: user.id,
            username: user.username,
            companyId: user.companyId
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map