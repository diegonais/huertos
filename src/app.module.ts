// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TaskModule } from './task/task.module';
import { TaskEventModule } from './task-event/task-event.module';
import { ItemModule } from './item/item.module';
import { MovementModule } from './movement/movement.module';
import { SeedModule } from 'seed/seed.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // carga .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: parseInt(config.get<string>('DATABASE_PORT', '5432'), 10),
        username: config.get<string>('DATABASE_USER', 'postgres'),
        password: config.get<string>('DATABASE_PASSWORD', ''),
        database: config.get<string>('DATABASE_NAME', 'postgres'),
        entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
        synchronize: true,
        logging: true,
      }),
    }),
    TaskModule,
    TaskEventModule,
    ItemModule,
    MovementModule,
    RoleModule,
    UserModule,
    LoginModule,
    SeedModule
    // otros módulos...
  ],
})
export class AppModule {}
