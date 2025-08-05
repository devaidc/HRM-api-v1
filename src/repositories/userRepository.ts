import { prisma } from '../utils/database';
import { User } from '../types';

export class UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: { username },
      include: {
        company: true
      }
    });
    
    return result as unknown as User | null;
  }

  async findById(id: number): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: { id },
      include: {
        company: true
      }
    });
    
    return result as unknown as User | null;
  }

  async create(username: string, hashedPassword: string, companyId?: number): Promise<User> {
    const result = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        companyId
      },
      include: {
        company: true
      }
    });
    
    return result as unknown as User;
  }

  async updateCompany(userId: number, companyId: number): Promise<User> {
    const result = await prisma.user.update({
      where: { id: userId },
      data: { companyId },
      include: {
        company: true
      }
    });
    
    return result as unknown as User;
  }

  async findByCompanyId(companyId: number): Promise<User[]> {
    const results = await prisma.user.findMany({
      where: { companyId },
      include: {
        company: true
      }
    });
    
    return results as unknown as User[];
  }
} 