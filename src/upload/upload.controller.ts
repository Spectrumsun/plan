import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  Res,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: any,
  ) {
    const userId = req['user'].id;
    return this.uploadService.upload(file, res, userId);
  }

  @Get()
  async getUpload(@Res() res: any, @Req() req: Request) {
    const userId = req['user'].id;
    return this.uploadService.get(res, userId);
  }

  @Get(':id')
  async getSingleUpload(
    @Param('id') id: string,
    @Res() res: any,
    @Req() req: Request,
  ) {
    const userId = req['user'].id;
    return this.uploadService.getOne(res, userId, Number(id));
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: string,
    @Res() res: any,
    @Req() req: Request,
  ) {
    const userId = req['user'].id;
    return this.uploadService.deleteOne(res, userId, Number(id));
  }
}
