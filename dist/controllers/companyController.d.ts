import { Request, Response } from 'express';
export declare class CompanyController {
    private companyService;
    constructor();
    createCompany(req: Request, res: Response): Promise<void>;
    getCompanyById(req: Request, res: Response): Promise<void>;
    getAllCompanies(req: Request, res: Response): Promise<void>;
    updateCompany(req: Request, res: Response): Promise<void>;
    deleteCompany(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=companyController.d.ts.map