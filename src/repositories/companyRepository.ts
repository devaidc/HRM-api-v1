import { prisma } from '../utils/database';
import { Company } from '../types';

export class CompanyRepository {
  async create(name: string): Promise<Company> {
    return prisma.company.create({
      data: { name }
    }) as unknown as Company;
  }

  async findById(id: number): Promise<Company | null> {
    const result = await prisma.company.findUnique({
      where: { id },
      include: {
        users: true
      }
    });
    
    return result as unknown as Company | null;
  }

  async findByName(name: string): Promise<Company | null> {
    return prisma.company.findFirst({
      where: { name }
    }) as unknown as Company | null;
  }

  async getAll(): Promise<Company[]> {
    const results = await prisma.company.findMany({
      include: {
        users: true
      }
    });
    
    return results as unknown as Company[];
  }

  async update(id: number, name: string): Promise<Company> {
    return prisma.company.update({
      where: { id },
      data: { name }
    }) as unknown as Company;
  }

  async delete(id: number): Promise<Company> {
    return prisma.company.delete({
      where: { id }
    }) as unknown as Company;
  }
} 