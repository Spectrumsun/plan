// src/cloudinary/cloudinary.provider.ts
import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../constants';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  },
  inject: [ConfigService],
};
