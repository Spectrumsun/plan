import { Injectable } from '@nestjs/common';
import { ResponseHelper } from '../helpers/response.helper';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseHelper: ResponseHelper,
    private http: HttpService,
  ) {}

  async create(dto: CreateSubscriptionDto, res: Response, userId: number) {
    try {
      const startDate = new Date();
      const endDate = new Date(
        new Date().setDate(startDate.getDate() + Number(30)),
      );

      const data = await this.prisma.subscription.create({
        data: {
          planId: dto.planId,
          userId: userId,
          amountPaid: dto.amountPaid,
          paymentId: dto.paymentId,
          paymentGateway: dto.paymentGateway,
          paymentMethod: dto.paymentMethod,
          planStartDate: startDate,
          planEndDate: endDate,
        },
      });
      return this.responseHelper.success(
        res,
        'Subscription created successfully',
        data,
      );
    } catch (error) {
      return this.responseHelper.error(res, 'An error occurred', error);
    }
  }

  async get(res: Response, userId: number) {
    try {
      const data = await this.prisma.subscription.findUnique({
        where: {
          userId: userId,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          plan: true,
        },
      });
      return this.responseHelper.success(res, 'Subscription list', data);
    } catch (error) {
      return this.responseHelper.error(res, 'An error occurred', error);
    }
  }

  async pay(
    res: Response,
    userData: { id: number; email: string },
    id: number,
  ) {
    const findPlan = await this.prisma.plan.findUnique({
      where: {
        id: id,
      },
    });

    if (!findPlan) {
      return this.responseHelper.error(res, 'Plan not found');
    }
    const data = {
      email: userData.email,
      amount: findPlan.price,
      metadata: {
        planId: findPlan.id,
        userId: userData.id,
      },
      planId: findPlan.id,
      userId: userData.id,
    };

    const result = await this.httpRequest(data);
    return this.responseHelper.success(
      res,
      'Open the the url in a browser to make payment',
      result.data,
    );
  }

  private async httpRequest(data: { email: string; amount: number }) {
    const url = process.env.PAY_STACK_URL;
    const tokenStr = process.env.PAY_STACK_SECRET_KEY;
    const { data: result } = await firstValueFrom(
      this.http
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${tokenStr}`,
          },
        })
        .pipe(
          catchError((error: any) => {
            console.log(error, 'error');
            throw 'An error happened!';
          }),
        ),
    );
    return result;
  }
}
