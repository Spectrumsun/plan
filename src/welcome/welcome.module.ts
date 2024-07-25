import { Module } from '@nestjs/common';
import { WelcomeController } from './welcome.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [WelcomeController],
})
export class WelcomeModule {}
