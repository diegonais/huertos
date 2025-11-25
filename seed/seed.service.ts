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
    private readonly farmService: FarmService,
    private readonly plotService: PlotService,
  ) {}

  async runSeed() {
    // ---------- Roles ----------
    const rolesData = ['admin', 'manager', 'worker'];
    const roles = {};
    for (const roleName of rolesData) {
      let role = (await this.roleService.findAll()).find(r => r.name === roleName);
      if (!role) {
        role = await this.roleService.create({ name: roleName, permissions: roleName === 'admin' ? { all: true } : {} });
        this.logger.log(`Rol ${roleName} creado`);
      } else {
        this.logger.log(`Rol ${roleName} ya existe`);
      }
      roles[roleName] = role;
    }

    // ---------- Usuarios ----------
    const usersData = [
      { email: 'admin@example.com', password: 'Admin123!', name: 'Administrador', role: roles['admin'] },
      { email: 'manager@example.com', password: 'Manager123!', name: 'Manager', role: roles['manager'] },
      { email: 'worker@example.com', password: 'Worker123!', name: 'Worker', role: roles['worker'] },
    ];

    const createdUsers = {};
    for (const u of usersData) {
      let user = (await this.userService.findAll()).find(user => user.email === u.email);
      if (!user) {
        const hashedPassword = await bcrypt.hash(u.password, 10);
        user = await this.userService.create({
          email: u.email,
          password: u.password, // El UserService debe hacer hashing o usar hashedPassword
          name: u.name,
          roleId: u.role.id,
        });
        this.logger.log(`Usuario ${u.email} creado`);
      } else {
        this.logger.log(`Usuario ${u.email} ya existe`);
      }
      createdUsers[u.email] = user;
    }

    // ---------- Farm inicial ----------
    let farm = (await this.farmService.findAll()).find(f => f.name === 'Huerto Principal');
    if (!farm) {
      farm = await this.farmService.create({
        ownerId: createdUsers['admin@example.com'].id,
        name: 'Huerto Principal',
        location: 'Ciudad, Zona de prueba',
        description: 'Farm inicial para testing',
        areaM2: 1000,
      });
      this.logger.log('Farm inicial creada');
    } else {
      this.logger.log('Farm inicial ya existe');
    }

    // ---------- Plot inicial ----------
    let plot = (await this.plotService.findAll()).find(p => p.code === 'P1' && p.farmId === farm.id);
    if (!plot) {
      plot = await this.plotService.create({
        farmId: farm.id,
        code: 'P1',
        name: 'Plot 1',
        areaM2: 200,
        soilType: 'Arcilloso',
        geometry: {},
      });
      this.logger.log('Plot inicial creado');
    } else {
      this.logger.log('Plot inicial ya existe');
    }

    return { message: 'Seed extendido ejecutado ✅' };
  }
}
