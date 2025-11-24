import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private repo: Repository<Role>) { }

  async create(dto: CreateRoleDto): Promise<Role> {
    const exists = await this.repo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException('Role already exists');
    const r = this.repo.create({ name: dto.name, permissions: dto.permissions });
    return this.repo.save(r);
  }

  async findAll(): Promise<Role[]> {
    return this.repo.find();
  }

  async findByName(name: string): Promise<Role | null> {
    return this.repo.findOne({ where: { name } });
  }

  async findById(id: number): Promise<Role | null> {
    return this.repo.findOne({ where: { id } });
  }
}
