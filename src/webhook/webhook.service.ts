import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseHelper } from '../helpers/response.helper';
import { Response } from 'express';
@Injectable()
export class WebhookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  async createPlan(payload: any, res: Response): Promise<void> {
    try {
      console.log(payload.data.metadata, 'meta')
      if (payload.event !== 'charge.success') {
        return this.responseHelper.error(res, 'Payment was not successful');
      }
      const startDate = new Date();
      const endDate = new Date(
        new Date().setDate(startDate.getDate() + Number(30)),
      );

      const create = await this.prisma.subscription.create({
        data: {
          planId: Number(payload.data.metadata.planId),
          userId: Number(payload.data.metadata.userId),
          amountPaid: Number(payload.data.amount),
          paymentId: payload.data.id,
          paymentGateway: 'Paystack',
          paymentMethod: payload.data.channel,
          planStartDate: startDate,
          planEndDate: endDate,
        },
      });
      console.log('Successful', create);
    } catch (error) {
      console.log('An error occurred', error);
    }
  }
}
