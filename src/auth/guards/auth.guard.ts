import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { extractTokenFromHeader } from 'src/auth/utils/auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request as Request);
    if (!token) {
      Logger.error('No token found', 'AuthGuard');
      throw new UnauthorizedException();
    }
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });
      Logger.log('Payload: ' + JSON.stringify(payload), 'AuthGuard');
      request['user'] = payload;
    } catch (error: any) {
      Logger.error(error.message, 'AuthGuard');
      throw new UnauthorizedException();
    }
    return true;
  }
}
