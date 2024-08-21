import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { SUCCESS_MESSAGES } from '@app/common';
import { USER_ERROR_MESSAGES } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from '@app/common';
import { Response } from 'express';
import { TokenPayload } from '@app/common';
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
      sub: user.userId,
      username: user.username,
      roles: user.roles,
    };
    const jwtToken = await this.jwtService.signAsync(tokenPayload);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    return { access_token: jwtToken };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const isUserExist = await this.userService.validateCreateUserDto(
      createUserDto.username,
      createUserDto.email,
    );
    if (isUserExist) {
      throw new UnprocessableEntityException(
        USER_ERROR_MESSAGES.USER_ALREADY_EXISTS,
      );
    }

    const newUser = await this.userService.createUser(createUserDto);
    if (!newUser) {
      Logger.error('Error creating user');
      throw new HttpException(
        USER_ERROR_MESSAGES.CREATE_USER,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return newUser;
  }

  async logout(response: Response) {
    try {
      response.clearCookie('Authorization');
      response.status(HttpStatus.OK).send(SUCCESS_MESSAGES.USER_LOGGED_OUT);
    } catch (error) {
      Logger.error('Error logging out: ', error);
      throw new HttpException(
        USER_ERROR_MESSAGES.LOGOUT_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async extractUserFromToken(token: string): Promise<User> {
    try {
      const decodedToken = this.jwtService.decode(token) as TokenPayload;
      console.log('decodedToken', decodedToken);

      const user = await this.userService.getUser(decodedToken.username);
      return user;
    } catch (error) {
      Logger.error('Error decoding token', error);
      throw new HttpException(
        error.message || USER_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
