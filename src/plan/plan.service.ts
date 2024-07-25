import { CreatePlanDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ResponseHelper } from '../helpers/response.helper';
import { Response } from 'express';

@Injectable()
export class PlanService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  async create(dto: CreatePlanDto, res: Response) {
    try {
      const data = await this.prisma.plan.create({
        data: {
          name: dto.name,
          description: dto.description,
          price: dto.price,
          validity: dto.validity,
        },
      });

      return this.responseHelper.success(res, 'Plan created', data);
    } catch (error) {
      return this.responseHelper.error(res, 'An error occurred', error);
    }
  }

  async get(res: Response) {
    try {
      const data = await this.prisma.plan.findMany();
      return this.responseHelper.success(res, 'Plan list', data);
    } catch (error) {
      return this.responseHelper.error(res, 'An error occurred', error);
    }
  }
}
