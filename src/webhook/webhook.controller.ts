import { Controller, Post, Body, Headers, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('webhook')
export class WebhookController {
  @Post()
  handleWebhook(
    @Body() body: any,
    @Headers() headers: any,
    @Req() request: Request,
  ) {
    // console.log('Received webhook:', {
    //   body,
    //   headers,
    //   rawBody: request.rawBody,
    // });

    return { received: true };
  }
}
