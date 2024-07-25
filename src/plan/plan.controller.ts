import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  async createPlan(@Body() dto: CreatePlanDto, @Res() res: any) {
    return this.planService.create(dto, res);
  }

  @Get()
  async getPlan(@Res() res: any) {
    return this.planService.get(res);
  }
}
