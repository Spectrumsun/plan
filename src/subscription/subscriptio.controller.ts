import { Controller, Post, Body, Req, Res, Get, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async createSubscription(
    @Body() dto: CreateSubscriptionDto,
    @Res() res: any,
    @Req() req: Request,
  ) {
    const userId = req['user'].id;
    return this.subscriptionService.create(dto, res, userId);
  }

  @Get()
  async getSubscription(@Res() res: any, @Req() req: Request) {
    const userId = req['user'].id;
    return this.subscriptionService.get(res, userId);
  }

  @Get('pay-link/:id')
  async paySub(@Param('id') id: string, @Res() res: any, @Req() req: Request) {
    const user = req['user'];
    return this.subscriptionService.pay(res, user, Number(id));
  }
}
