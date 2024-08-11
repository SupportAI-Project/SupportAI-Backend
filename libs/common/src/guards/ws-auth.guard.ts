import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import * as cookie from 'cookie';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private reflactor: Reflector,
    private readonly authService: AuthService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.getArgs()[0];
    const cookies = cookie.parse(client.handshake.headers.cookie || '');

    const authorization = cookies['Authorization'];

    if (!authorization) {
      Logger.error('No authorization header found', 'WsAuthGuard');
      return false;
    }
    const user = this.authService.extractUserFromToken(authorization);
    if (!user) {
      Logger.error('No user found in token', 'WsAuthGuard');
      return false;
    }
    return true;
  }
}
