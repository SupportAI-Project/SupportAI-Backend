import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '@app/common';
import { JwtFromRequestFunction } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtExtractor: JwtFromRequestFunction<any> = (request: any) => {
      const token = request?.cookies?.Authorization;
      if (!token) {
        Logger.error('Unauthorized token', 'JwtStrategy');
        throw new UnauthorizedException('Unauthorized token');
      }
      return token;
    };
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    return {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
