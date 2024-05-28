import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user/user.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/constants/constants';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from './user/model/user.model';
import { Response } from 'express';
import { TWO_HOURS_FROM_NOW_DATE } from 'src/constants/constants';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, response: Response) {
    const dbUser = await this.userService.getUser(loginDto.username);
    if (!dbUser) {
      console.log('user not found in get user');
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      dbUser.password,
    );
    if (!isPasswordMatching) {
      console.log('password not matching');
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const payload = { sub: dbUser.id, username: dbUser.username };
    const jwtToken = this.jwtService.sign(payload);
    response.cookie('Authentication', jwtToken, {
      httpOnly: true,
      expires: TWO_HOURS_FROM_NOW_DATE,
    });
    return jwtToken;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log('createUserDto ', createUserDto);
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
        console.log('error creating user');
        throw new HttpException(
          ERROR_MESSAGES.CREATE_USER,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return newUser;
    } catch (error) {
      console.log('error', error.message);
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
      response.clearCookie('Authentication');
      response.status(HttpStatus.OK).send(SUCCESS_MESSAGES.USER_LOGGED_OUT);
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGES.LOGOUT_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
