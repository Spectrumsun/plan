import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { WelcomeModule } from './welcome/welcome.module';
import { ResponseHelper } from './helpers/response.helper';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlanModule } from './plan/plan.module';
import { AuthMiddleware } from './middleware/authMiddleare';
import { PlanController } from './plan/plan.controller';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionController } from './subscription/subscriptio.controller';
import { UploadController } from './upload/upload.controller';
// import { WebhookController } from './webhook/webhook.controller';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionMiddleware } from './middleware/subscriptionMiddleware';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    WelcomeModule,
    AuthModule,
    PrismaModule,
    PlanModule,
    SubscriptionModule,
    UploadModule,
    WebhookModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [ResponseHelper],
  // controllers: [WebhookController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(PlanController, SubscriptionController, UploadController)
      .apply(SubscriptionMiddleware)
      .forRoutes(UploadController);
  }
}
