import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { THREE_DAYS, User } from '@app/common';
import { CreateUserDto } from './user/dto/create-user.dto';
import { JwtAuthGuard } from '@app/common';
import { LocalAuthGuard } from '@app/common';
import { CurrentUser } from '@app/common';
import { Public } from '@app/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login(user);
    response.cookie('Authorization', access_token, {
      httpOnly: true,
      maxAge: THREE_DAYS,
    });
    return user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: 'Log out the current user' })
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);
    return { message: 'Logout successful' };
  }
}
