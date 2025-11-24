import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private svc: RolesService) { }

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.svc.create(dto);
  }

  @Get()
  async list() {
    return this.svc.findAll();
  }
}
