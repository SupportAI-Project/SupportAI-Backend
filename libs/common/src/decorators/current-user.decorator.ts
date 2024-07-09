import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { User } from '../entities';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest();
  Logger.log(`Request user: ${request.user}`);
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
