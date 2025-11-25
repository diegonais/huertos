import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

// Módulos fase 0
// import { LoginModule } from './auth/login.module';
// import { SeedModule } from './seed/seed.module';

// Módulos adicionales (si no existen, comenta estos)
// import { TaskModule } from './task/task.module';
// import { TaskEventModule } from './task-event/task-event.module';
// import { ItemModule } from './item/item.module';
// import { MovementModule } from './movement/movement.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskEventsModule } from './task-events/task-events.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') || '5436'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),

        autoLoadEntities: true,
        synchronize: true,
      }),
    }),


    RolesModule,
    UsersModule,
    TasksModule,
    TaskEventsModule,
    // LoginModule,
    // SeedModule,

    //TaskModule,
    //TaskEventModule,
    //ItemModule,
    //MovementModule,
  ],
})
export class AppModule { }
