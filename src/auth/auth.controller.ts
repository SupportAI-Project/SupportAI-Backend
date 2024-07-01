import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Res,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { MyAuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { User } from './user/entity/user.model';
import { CreateUserDto } from './user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TWO_HOURS_FROM_NOW_DATE } from '@app/common/constants/auth/auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwtToken = await this.authService.login(loginDto);
    response.cookie('access_token', jwtToken, {
      httpOnly: true,
      expires: TWO_HOURS_FROM_NOW_DATE,
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }
  @UseGuards(MyAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    Logger.log('User logged out', 'AuthController');
    await this.authService.logout(response);
  }

  @UseGuards(MyAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
