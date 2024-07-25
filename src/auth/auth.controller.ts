import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, SignInUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: SignUpUserDto, @Res() res: any) {
    return this.authService.signUp(dto, res);
  }

  @Post('signin')
  async signIn(@Body() dto: SignInUserDto, @Res() res: any) {
    return await this.authService.signIn(dto, res);
  }
}
