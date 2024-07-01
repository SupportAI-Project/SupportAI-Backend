import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user/user.service';
import { SUCCESS_MESSAGES } from '@app/common/constants/app.constants';
import { ERROR_MESSAGES } from '@app/common/constants/errors/error.messages';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from './user/entity/user.model';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { TokenPayload } from 'src/interfaces/TokenPayload';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const dbUser = await this.userService.getUser(loginDto.username);
    if (!dbUser) {
      Logger.error('User not found');
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      dbUser.password,
    );
    if (!isPasswordMatching) {
      Logger.error('password not matching');
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const tokenPayload: TokenPayload = {
      sub: dbUser.id,
      username: dbUser.username,
    };
    const jwtToken = await this.jwtService.signAsync(tokenPayload);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    return { access_token: jwtToken };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const isUserExist =
        (await this.userService.getUser(createUserDto.username)) !== null;
      if (isUserExist) {
        throw new HttpException(
          ERROR_MESSAGES.USER_ALREADY_EXISTS,
          HttpStatus.BAD_REQUEST,
        );
      }
      const newUser = await this.userService.createUser(createUserDto);
      if (!newUser) {
        Logger.error('Error creating user');
        throw new HttpException(
          ERROR_MESSAGES.CREATE_USER,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return newUser;
    } catch (error) {
      Logger.error('Error creating user: ', error);
      if (
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new HttpException(
          ERROR_MESSAGES.USER_ALREADY_EXISTS,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error.message.includes(ERROR_MESSAGES.USER_ALREADY_EXISTS)) {
        throw new HttpException(
          ERROR_MESSAGES.USER_ALREADY_EXISTS,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        ERROR_MESSAGES.CREATE_USER,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async logout(response: Response) {
    try {
      Logger.log('Logging out');
      response.clearCookie('Authorization');
      response.status(HttpStatus.OK).send(SUCCESS_MESSAGES.USER_LOGGED_OUT);
    } catch (error) {
      Logger.error('Error logging out: ', error);
      throw new HttpException(
        ERROR_MESSAGES.LOGOUT_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
