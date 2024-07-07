import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from '@app/common';
import { CreateUserDto } from './user/dto/create-user.dto';
import { TWO_HOURS_FROM_NOW_DATE } from '@app/common';
import { JwtAuthGuard } from '@app/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@app/common';
import { Public } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login(user);
    response.cookie('Authorization', access_token, {
      httpOnly: true,
      expires: TWO_HOURS_FROM_NOW_DATE,
    });
    return { message: 'Login successful' };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.authService.register(createUserDto);
    } catch (e) {
      Logger.error('register function error', e.message);
      throw new HttpException(
        e.message || 'An error occurred while registering user',
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);
  }
}
