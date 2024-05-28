import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user/user.service';
import { ERROR_MESSAGES } from 'src/constants/constants';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from './user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const dbUser = await this.userService.getUserByUsername(loginDto.username);
    if (!dbUser) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const isPasswordMatching = await this.userService.comparePassword(
      loginDto.password,
      dbUser.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const payload = { sub: dbUser.id, username: dbUser.username };
    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log('createUserDto ', createUserDto);
      const isUserExist =
        (await this.userService.getUserByUsername(createUserDto.username)) !==
        null;
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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
