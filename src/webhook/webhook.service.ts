import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseHelper } from '../helpers/response.helper';

@Injectable()
export class WebhookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  async handleWebhook(payload: any): Promise<void> {
    console.log('Received and validated webhook payload:', payload);
  }
}
