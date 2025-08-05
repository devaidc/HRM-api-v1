import { LoginRequest, LoginResponse } from '../types';
export declare class AuthService {
    private userRepository;
    constructor();
    login(loginData: LoginRequest): Promise<LoginResponse>;
    register(username: string, password: string, companyId?: number): Promise<{
        id: number;
        username: string;
        companyId?: number;
    }>;
    assignUserToCompany(userId: number, companyId: number): Promise<{
        id: number;
        username: string;
        companyId: number;
    }>;
}
//# sourceMappingURL=authService.d.ts.map