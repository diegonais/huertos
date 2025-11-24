import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  async runSeed() {
    // 1️⃣ Crear rol admin si no existe
    let adminRole = (await this.roleService.findAll()).find(r => r.name === 'admin');
    if (!adminRole) {
      adminRole = await this.roleService.create({ name: 'admin', permissions: { all: true } });
      this.logger.log('Rol admin creado');
    } else {
      this.logger.log('Rol admin ya existe');
    }

    // 2️⃣ Crear usuario admin si no existe
    let adminUser = (await this.userService.findAll()).find(u => u.email === 'admin@example.com');
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      adminUser = await this.userService.create({
        email: 'admin@example.com',
        password: 'Admin123!',
        name: 'Administrador',
        roleId: adminRole.id,
      });
      this.logger.log('Usuario admin creado');
    } else {
      this.logger.log('Usuario admin ya existe');
    }

    return { message: 'Seed inicial ejecutado ✅' };
  }
}
