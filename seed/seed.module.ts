import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { FarmModule } from '../farm/farm.module';
import { PlotModule } from '../plot/plot.module';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [RoleModule, UserModule, FarmModule, PlotModule],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
