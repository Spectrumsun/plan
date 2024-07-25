import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHelper {
  success(
    response: any,
    message: string,
    data: any = null,
    status: number = 200,
  ) {
    return response.status(status).json({
      status: 'success',
      message: message,
      data: data,
    });
  }

  error(
    response: any,
    message: string,
    data: any = null,
    status: number = 400,
  ) {
    return response.status(status).json({
      status: 'error',
      message: message,
      data: data,
    });
  }
}
