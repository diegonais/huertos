import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class AuthController {
  constructor(private svc: AuthService) { }

  @Post()
  async login(@Body() dto: LoginDto) {
    return this.svc.login(dto.email, dto.password);
  }
}
