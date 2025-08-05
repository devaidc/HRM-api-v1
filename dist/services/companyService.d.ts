import { CreateCompanyRequest, Company } from '../types';
export declare class CompanyService {
    private companyRepository;
    constructor();
    createCompany(companyData: CreateCompanyRequest): Promise<Company>;
    getCompanyById(id: number): Promise<Company>;
    getAllCompanies(): Promise<Company[]>;
    updateCompany(id: number, name: string): Promise<Company>;
    deleteCompany(id: number): Promise<Company>;
}
//# sourceMappingURL=companyService.d.ts.map