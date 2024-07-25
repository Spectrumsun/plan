import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [PrismaModule, SharedModule],
  providers: [PlanService],
  controllers: [PlanController],
})
export class PlanModule {}
