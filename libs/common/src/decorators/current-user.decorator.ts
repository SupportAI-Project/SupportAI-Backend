import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities';
import { Logger } from '@nestjs/common';
const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    Logger.log('http get type', 'current user decorator');
    return context.switchToHttp().getRequest().user;
  } else if (context.getType() === 'ws') {
    Logger.log('ws get type', 'current user decorator');
    return context.switchToWs().getClient().handshake.user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
