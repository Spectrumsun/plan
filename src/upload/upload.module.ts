// src/upload/upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryModule } from '../helpers/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { UploadService } from './upload.service';
import { SharedModule } from '../shared/shared.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    CloudinaryModule,
    PrismaModule,
    SharedModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
