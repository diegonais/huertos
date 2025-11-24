// src/login/login.module.ts
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiresInEnv = configService.get<string>('JWT_EXPIRES_IN');

        if (!secret) throw new Error('JWT_SECRET no está definido en .env');

        // If the env value is numeric, convert to number; otherwise keep string (e.g. "1h")
        const expiresIn =
          expiresInEnv && !isNaN(Number(expiresInEnv)) ? Number(expiresInEnv) : expiresInEnv ?? '3600s';

        return {
          secret,
          // cast to any to satisfy JwtModuleOptions (expiresIn expects number | StringValue)
          signOptions: { expiresIn: expiresIn as any },
        };
      },
    }),
  ],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
