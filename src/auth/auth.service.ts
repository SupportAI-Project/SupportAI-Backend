import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from './user/user.service';
import { SUCCESS_MESSAGES } from '@app/common/constants/app.constants';
import { ERROR_MESSAGES } from '@app/common/constants/errors/error.messages';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from './user/entity/user.model';
import { Response } from 'express';
import { TokenPayload } from 'src/interfaces/TokenPayload';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(user: User): Promise<{ access_token: string }> {
    const tokenPayload: TokenPayload = {
      sub: user.id,
      username: user.username,
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
