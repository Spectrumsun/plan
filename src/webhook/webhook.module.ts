import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { SharedModule } from '../shared/shared.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, SharedModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
