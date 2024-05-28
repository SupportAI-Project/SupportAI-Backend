import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from './user/entity/user.model';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SUCCESS_MESSAGES } from '@app/common/constants/constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwtToken = await this.authService.login(loginDto, response);
    return { message: SUCCESS_MESSAGES.USER_LOGGED_IN, token: jwtToken };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);
  }
}
