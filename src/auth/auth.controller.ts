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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from '@app/common';
import { CreateUserDto } from './user/dto/create-user.dto';
import { TWO_HOURS_FROM_NOW_DATE } from '@app/common';
import { JwtAuthGuard } from '@app/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@app/common';
import { Public } from '@app/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Login successful' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiBody({
    description: 'User login credentials',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['username', 'password'],
    },
  })
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
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred while registering user',
  })
  @ApiBody({ type: CreateUserDto })
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
  @ApiOperation({ summary: 'Log out the current user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Logout successful' })
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);
    return { message: 'Logout successful' };
  }
}
