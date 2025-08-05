import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor();
    login(req: Request, res: Response): Promise<void>;
    register(req: Request, res: Response): Promise<void>;
    assignUserToCompany(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=authController.d.ts.map