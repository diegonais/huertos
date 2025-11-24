import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) { }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.svc.create(dto);
  }

  @Get()
  async list() {
    return this.svc.findAll();
  }
}
