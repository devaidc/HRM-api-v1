import { User } from '../types';
export declare class UserRepository {
    findByUsername(username: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(username: string, hashedPassword: string, companyId?: number): Promise<User>;
    updateCompany(userId: number, companyId: number): Promise<User>;
    findByCompanyId(companyId: number): Promise<User[]>;
}
//# sourceMappingURL=userRepository.d.ts.map