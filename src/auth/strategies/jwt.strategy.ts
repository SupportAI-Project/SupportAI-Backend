import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { TokenPayload } from 'src/interfaces/TokenPayload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UserService,
    configService: ConfigService,
  ) {
    Logger.log('JwtStrategy constructor');
    const jwtExtractor: JwtFromRequestFunction<any> = (request: any) => {
      Logger.log('JwtStrategy jwtExtractor');
      let token =
        request?.cookies?.Authentication ||
        request?.Authentication ||
        request?.headers.Authentication ||
        request?.headers.authentication ||
        request?.headers.authorization ||
        request?.authentication;
      token = token.replace('Bearer ', '');
      if (!token) {
        Logger.error('No token found');
        return null;
      }
      return token;
    };

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractor]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    Logger.log('JwtStrategy validate');
    return await this.usersService.getUser(payload.username);
  }
}
