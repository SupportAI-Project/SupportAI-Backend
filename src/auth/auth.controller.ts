import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from './user/model/user.model';
import { Response } from 'express';
import { TWO_HOURS_FROM_NOW_DATE } from 'src/constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwtToken = this.authService.login(loginDto);
    response.cookie('jwt', jwtToken, {
      httpOnly: true,
      expires: TWO_HOURS_FROM_NOW_DATE,
    });
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
