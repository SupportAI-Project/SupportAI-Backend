import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { ERROR_MESSAGES } from 'src/constants/constants';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const dbUser = await this.userService.getUserByUsername(
      createUserDto.username,
    );
    if (dbUser) {
      throw new HttpException(
        ERROR_MESSAGES.USERNAME_TAKEN,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.createUser(createUserDto);
  }
}
