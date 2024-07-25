import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResponseHelper } from '../helpers/response.helper';

@Controller('/')
export class WelcomeController {
  constructor(private readonly responseHelper: ResponseHelper) {}

  @Get()
  getWelcome(@Res() res: Response) {
    return this.responseHelper.success(res, 'Welcome to /api');
  }
}
