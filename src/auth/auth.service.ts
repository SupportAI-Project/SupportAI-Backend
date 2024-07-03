import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { SUCCESS_MESSAGES } from '@app/common/constants/app.constants';
import { ERROR_MESSAGES } from '@app/common/constants/errors/error.messages';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from '../../libs/common/src/entities/user.model';
import { Response } from 'express';
import { TokenPayload } from '@app/common/interfaces/TokenPayload';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../libs/common/src/interfaces/role.enum';
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
      roles: user.roles,
    };
    const jwtToken = await this.jwtService.signAsync(tokenPayload);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    return { access_token: jwtToken };
  }

  async register(
    createUserDto: CreateUserDto,
    roles: Role[] = [Role.USER],
  ): Promise<User> {
    const isUserExist = await this.userService.isUserExistsCheck(
      createUserDto.username,
      createUserDto.email,
    );
    if (isUserExist) {
      throw new UnprocessableEntityException(
        ERROR_MESSAGES.USER_ALREADY_EXISTS,
      );
    }

    const userWithRole: CreateUserDto = { ...createUserDto, roles };

    const newUser = await this.userService.createUser(userWithRole);
    if (!newUser) {
      Logger.error('Error creating user');
      throw new HttpException(
        ERROR_MESSAGES.CREATE_USER,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return newUser;
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
