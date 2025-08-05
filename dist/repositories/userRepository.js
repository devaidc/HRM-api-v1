"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = require("../utils/database");
class UserRepository {
    async findByUsername(username) {
        const result = await database_1.prisma.user.findUnique({
            where: { username },
            include: {
                company: true
            }
        });
        return result;
    }
    async findById(id) {
        const result = await database_1.prisma.user.findUnique({
            where: { id },
            include: {
                company: true
            }
        });
        return result;
    }
    async create(username, hashedPassword, companyId) {
        const result = await database_1.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                companyId
            },
            include: {
                company: true
            }
        });
        return result;
    }
    async updateCompany(userId, companyId) {
        const result = await database_1.prisma.user.update({
            where: { id: userId },
            data: { companyId },
            include: {
                company: true
            }
        });
        return result;
    }
    async findByCompanyId(companyId) {
        const results = await database_1.prisma.user.findMany({
            where: { companyId },
            include: {
                company: true
            }
        });
        return results;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map