import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersSvc: UsersService,
    private jwtSvc: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersSvc.validateUserByEmailAndPassword(email, password);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtSvc.sign(payload),
    };
  }
}
