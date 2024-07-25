import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IDecode {
  id: number;
}

interface RequestWithUserId extends Request {
  user?: IDecode;
}

@Injectable()
export class SubscriptionMiddleware implements NestMiddleware {
  async use(req: RequestWithUserId, res: Response, next: NextFunction) {
    const userId = req['user']?.id;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!subscription) {
      throw new UnauthorizedException('No active subscription found');
    }
    next();
  }
}
