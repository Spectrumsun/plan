import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../helpers/cloudinary.service';
import { ResponseHelper } from '../helpers/response.helper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(
    private cloudinary: CloudinaryService,
    private readonly responseHelper: ResponseHelper,
    private readonly prisma: PrismaService,
  ) {}

  async upload(file: Express.Multer.File, res: Response, userId: number) {
    try {
      const uploading = await this.cloudinary.uploadImage(file);
      console.log(uploading, 'uploading');
      const savedUpload = await this.prisma.upload.create({
        data: {
          userId: userId,
          url: uploading.secure_url,
          publicId: uploading.public_id,
          metaData: {
            width: uploading.width,
            height: uploading.height,
            format: uploading.format,
            mediaType: uploading.resource_type,
            size: uploading.bytes,
            fileName: uploading.original_filename,
          },
        },
      });
      return this.responseHelper.success(res, 'Upload successful', savedUpload);
    } catch (error) {
      return this.responseHelper.error(res, 'An error occurred', error);
    }
  }

  async get(res: Response, userId: number) {
    try {
      const data = await this.prisma.upload.findMany({
        where: {
          userId: userId,
        },
      });
      return this.responseHelper.success(res, 'Upload found!!', data);
    } catch (error) {
      return this.responseHelper.error(res, 'An error occurred', error);
    }
  }

  async getOne(res: Response, userId: number, id: number) {
    try {
      const data = await this.prisma.upload.findMany({
        where: {
          id: id,
          userId: userId,
        },
      });
      return this.responseHelper.success(res, 'Upload found!!', data);
    } catch (error) {
      return this.responseHelper.error(res, 'An error occurred', error);
    }
  }

  async deleteOne(res: Response, userId: number, id: number) {
    try {
      const findItem = await this.prisma.upload.findUnique({
        where: {
          id: id,
          userId: userId,
        },
      });

      if (!findItem) {
        return this.responseHelper.error(
          res,
          'Upload not found',
          findItem,
          404,
        );
      }

      await this.cloudinary.deleteFile(findItem.publicId);
      const data = await this.prisma.upload.delete({
        where: {
          id: id,
          userId: userId,
        },
      });
      return this.responseHelper.success(res, 'Upload Deleted!!', data);
    } catch (error) {
      return this.responseHelper.error(res, 'An error occurred', error);
    }
  }
}
