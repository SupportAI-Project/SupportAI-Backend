// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from 'src/interfaces/TokenPayload';
import { JwtFromRequestFunction } from 'passport-jwt';
import { Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtExtractor: JwtFromRequestFunction<any> = (request: any) => {
      Logger.log('JwtStrategy jwtExtractor');
      const token = request?.cookies?.Authorization;
      if (!token) {
        Logger.error('No token found');
        return null;
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
    return { userId: payload.sub, username: payload.username };
  }
}
