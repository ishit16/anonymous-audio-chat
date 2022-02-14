import { Controller, Post, Body, Res, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  async login(
    @Body() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return this.authService.login(user, response);
  }

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user);
  }
}
