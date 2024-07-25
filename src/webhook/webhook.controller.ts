import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseHelper } from '../helpers/response.helper';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly responseHelper: ResponseHelper) {}

  @Post()
  async handleWebhook(
    @Body() payload: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('Received webhook:', payload);
    res.status(200).send('Webhook received');
  }

  @Get()
  async paymentRedirect(@Res() res: Response) {
    return this.responseHelper.success(
      res,
      'Successful, Check your payment plan',
    );
  }
}
