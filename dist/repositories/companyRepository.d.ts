import { Company } from '../types';
export declare class CompanyRepository {
    create(name: string): Promise<Company>;
    findById(id: number): Promise<Company | null>;
    findByName(name: string): Promise<Company | null>;
    getAll(): Promise<Company[]>;
    update(id: number, name: string): Promise<Company>;
    delete(id: number): Promise<Company>;
}
//# sourceMappingURL=companyRepository.d.ts.map