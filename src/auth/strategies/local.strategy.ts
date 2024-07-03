// src/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      usernameField: configService.get<string>('USERNAME_FIELD', 'username'),
      passwordField: configService.get<string>('PASSWORD_FIELD', 'password'),
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.verifyAndGetUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
