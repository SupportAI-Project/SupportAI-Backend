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
import { User } from '../entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<User | null> {
    if (!username || !password) {
      Logger.error('Invalid credentials', 'LocalStrategy');
      Logger.error('username: ' + username, 'LocalStrategy');
      Logger.error('password: ' + password, 'LocalStrategy');
      throw new BadRequestException('Invalid credentials');
    }
    const user = await this.userService.verifyUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
