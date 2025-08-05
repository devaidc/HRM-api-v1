"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const database_1 = require("../utils/database");
class CompanyRepository {
    async create(name) {
        return database_1.prisma.company.create({
            data: { name }
        });
    }
    async findById(id) {
        const result = await database_1.prisma.company.findUnique({
            where: { id },
            include: {
                users: true,
                locations: true
            }
        });
        return result;
    }
    async findByName(name) {
        return database_1.prisma.company.findFirst({
            where: { name }
        });
    }
    async getAll() {
        const results = await database_1.prisma.company.findMany({
            include: {
                users: true,
                locations: true
            }
        });
        return results;
    }
    async update(id, name) {
        return database_1.prisma.company.update({
            where: { id },
            data: { name }
        });
    }
    async delete(id) {
        return database_1.prisma.company.delete({
            where: { id }
        });
    }
}
exports.CompanyRepository = CompanyRepository;
//# sourceMappingURL=companyRepository.js.map