"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const companyRepository_1 = require("../repositories/companyRepository");
class CompanyService {
    constructor() {
        this.companyRepository = new companyRepository_1.CompanyRepository();
    }
    async createCompany(companyData) {
        const existingCompany = await this.companyRepository.findByName(companyData.name);
        if (existingCompany) {
            throw new Error('Company with this name already exists');
        }
        return this.companyRepository.create(companyData.name);
    }
    async getCompanyById(id) {
        const company = await this.companyRepository.findById(id);
        if (!company) {
            throw new Error('Company not found');
        }
        return company;
    }
    async getAllCompanies() {
        return this.companyRepository.getAll();
    }
    async updateCompany(id, name) {
        const existingCompany = await this.companyRepository.findByName(name);
        if (existingCompany && existingCompany.id !== id) {
            throw new Error('Company with this name already exists');
        }
        return this.companyRepository.update(id, name);
    }
    async deleteCompany(id) {
        return this.companyRepository.delete(id);
    }
}
exports.CompanyService = CompanyService;
//# sourceMappingURL=companyService.js.map