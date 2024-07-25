// src/auth/auth.service.ts
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto, SignInUserDto } from './dto';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ResponseHelper } from '../helpers/response.helper';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseHelper: ResponseHelper,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpUserDto, res: Response) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password: hashedPassword,
        },
      });
      const obj = this.createToken(user.id, user);
      return this.responseHelper.success(res, 'Successful', obj);
    } catch (error) {
      if (error.code === 'P2002') {
        return this.responseHelper.error(res, 'Email already exist', error);
      } else {
        if (error.code === 'P2OO2') {
          throw new ForbiddenException('Email already exist');
        } else {
          throw new ForbiddenException('error');
        }
      }
    }
  }

  async signIn(dto: SignInUserDto, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (!user) {
        return this.responseHelper.error(res, 'Account not found', user);
      }
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        return this.responseHelper.error(res, 'Email or password not correct');
      }
      const obj = this.createToken(user.id, user);
      return this.responseHelper.success(res, 'Successful', obj);
    } catch (error) {
      return this.responseHelper.error(res, 'An error occurred', error);
    }
  }

  private createToken(
    userId: number,
    user: { email: string; firstName: string; lastName: string },
  ) {
    const payload = { id: userId, email: user.email };
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: this.jwtService.sign(payload),
    };
  }
}
