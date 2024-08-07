import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private reflactor: Reflector,
    private readonly authService: AuthService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { authorization } = context.getArgs()[0].handshake.headers;

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
