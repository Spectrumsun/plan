import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseHelper } from '../helpers/response.helper';
import { WebhookService } from './webhook.service';
import * as crypto from 'crypto';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly responseHelper: ResponseHelper,
    private readonly webhookService: WebhookService,
  ) {}

  @Post()
  async handleWebhook(
    @Body() payload: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('running.....');
    const hash = crypto
      .createHmac('sha512', process.env.PAY_STACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');
    res.status(200).send('Webhook received');

    if (hash == req.headers['x-paystack-signature']) {
      console.log('verify');
      this.webhookService.createPlan(payload, res);
    } else {
      console.log('invalid signature');
    }
  }

  @Get()
  async paymentRedirect(@Res() res: Response) {
    return this.responseHelper.success(
      res,
      'Successful, Check your payment plan',
    );
  }
}
