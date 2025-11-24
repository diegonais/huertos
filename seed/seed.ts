import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from 'src/app.module';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const roleService = appContext.get(RoleService);
  const userService = appContext.get(UserService);

  // 1️⃣ Crear rol admin si no existe
  let adminRole;
  const roles = await roleService.findAll();
  adminRole = roles.find(r => r.name === 'admin');
  if (!adminRole) {
    adminRole = await roleService.create({ name: 'admin', permissions: { all: true } });
    console.log('Rol admin creado');
  } else {
    console.log('Rol admin ya existe');
  }

  // 2️⃣ Crear usuario admin si no existe
  const users = await userService.findAll();
  let adminUser = users.find(u => u.email === 'admin@example.com');
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    adminUser = await userService.create({
      email: 'admin@example.com',
      password: 'Admin123!',
      name: 'Administrador',
      roleId: adminRole.id,
    });
    console.log('Usuario admin creado');
  } else {
    console.log('Usuario admin ya existe');
  }

  console.log('Seed inicial completado ✅');

  await appContext.close();
}

bootstrap();
