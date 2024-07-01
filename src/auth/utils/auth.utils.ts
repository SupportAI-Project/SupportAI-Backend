import { Logger } from '@nestjs/common';
import { Request } from 'express';

export const extractTokenFromHeader = (
  request: Request,
): string | undefined => {
  Logger.log('Extracting token from header', 'AuthGuard');
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  Logger.log(`Token type: ${type}`, 'AuthGuard');
  Logger.log(`Token: ${token}`, 'AuthGuard');
  return type === 'Bearer' ? token : undefined;
};
