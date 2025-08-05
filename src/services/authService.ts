import { UserRepository } from '../repositories/userRepository';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { LoginRequest, LoginResponse } from '../types';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(loginData: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findByUsername(loginData.username);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(loginData.password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
      companyId: user.companyId
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        companyId: user.companyId,
        company: user.company ? {
          id: user.company.id,
          name: user.company.name
        } : undefined
      }
    };
  }

  async register(username: string, password: string, companyId?: number): Promise<{ id: number; username: string; companyId?: number }> {
    const existingUser = await this.userRepository.findByUsername(username);
    
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.userRepository.create(username, hashedPassword, companyId);

    return {
      id: user.id,
      username: user.username,
      companyId: user.companyId
    };
  }

  async assignUserToCompany(userId: number, companyId: number): Promise<{ id: number; username: string; companyId: number }> {
    const user = await this.userRepository.updateCompany(userId, companyId);
    
    return {
      id: user.id,
      username: user.username,
      companyId: user.companyId!
    };
  }

  async getCurrentUser(userId: number): Promise<{ id: number; username: string; companyId?: number; company?: { id: number; name: string } } | null> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      companyId: user.companyId,
      company: user.company ? {
        id: user.company.id,
        name: user.company.name
      } : undefined
    };
  }
} 