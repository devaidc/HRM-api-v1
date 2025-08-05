import { CompanyRepository } from '../repositories/companyRepository';
import { CreateCompanyRequest, Company } from '../types';

export class CompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async createCompany(companyData: CreateCompanyRequest): Promise<Company> {
    const existingCompany = await this.companyRepository.findByName(companyData.name);
    
    if (existingCompany) {
      throw new Error('Company with this name already exists');
    }

    return this.companyRepository.create(companyData.name);
  }

  async getCompanyById(id: number): Promise<Company> {
    const company = await this.companyRepository.findById(id);
    
    if (!company) {
      throw new Error('Company not found');
    }

    return company;
  }

  async getAllCompanies(): Promise<Company[]> {
    return this.companyRepository.getAll();
  }

  async updateCompany(id: number, name: string): Promise<Company> {
    const existingCompany = await this.companyRepository.findByName(name);
    
    if (existingCompany && existingCompany.id !== id) {
      throw new Error('Company with this name already exists');
    }

    return this.companyRepository.update(id, name);
  }

  async deleteCompany(id: number): Promise<Company> {
    return this.companyRepository.delete(id);
  }
} 