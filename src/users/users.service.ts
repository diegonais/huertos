import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private saltRounds: number;

  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {
    this.saltRounds = +(process.env.BCRYPT_SALT_ROUNDS || 10);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = dto.email;
    user.name = dto.name;
    user.phone = dto.phone;
    user.preferredTimezone = 'America/La_Paz';
    user.passwordHash = await bcrypt.hash(dto.password, this.saltRounds);
    if (dto.roleId) {
      const role = await this.roleRepo.findOne({ where: { id: dto.roleId } });
      if (role) user.role = role;
    }
    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    const u = await this.repo.findOne({ where: { id } });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async validateUserByEmailAndPassword(email: string, plain: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(plain, user.passwordHash);
    if (!ok) return null;
    return user;
  }
}
