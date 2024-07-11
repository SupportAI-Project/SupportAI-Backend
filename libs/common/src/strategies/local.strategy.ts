// src/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../../../src/auth/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    if (!username || !password) {
      Logger.error('Invalid credentials', 'LocalStrategy');
      Logger.error('username: ' + username, 'LocalStrategy');
      Logger.error('password: ' + password, 'LocalStrategy');
      throw new BadRequestException('Invalid credentials');
    }
    const user = await this.userService.verifyUser(username, password);
    if (!user) {
      Logger.error('no user found', 'LocalStrategy');
      throw new UnauthorizedException();
    }
    return user;
  }
}
