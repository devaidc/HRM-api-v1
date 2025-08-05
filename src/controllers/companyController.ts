import { Request, Response } from 'express';
import { CompanyService } from '../services/companyService';
import { CreateCompanyRequest } from '../types';

export class CompanyController {
  private companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();
  }

  async createCompany(req: Request, res: Response): Promise<void> {
    try {
      const companyData: CreateCompanyRequest = req.body;
      const { name } = companyData;

      if (!name) {
        res.status(400).json({ error: 'Company name is required' });
        return;
      }

      const result = await this.companyService.createCompany(companyData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getCompanyById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid company ID' });
        return;
      }

      const result = await this.companyService.getCompanyById(id);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getAllCompanies(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.companyService.getAllCompanies();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateCompany(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { name } = req.body;

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid company ID' });
        return;
      }

      if (!name) {
        res.status(400).json({ error: 'Company name is required' });
        return;
      }

      const result = await this.companyService.updateCompany(id, name);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async deleteCompany(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid company ID' });
        return;
      }

      const result = await this.companyService.deleteCompany(id);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
} 