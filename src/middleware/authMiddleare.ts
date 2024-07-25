import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token =
      req.body.token || req.query.token || req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    const tokenExist = token.split(' ')[1];

    try {
      const decoded = jwt.verify(tokenExist, process.env.JWT_SECRET);
      req['user'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }
}
