import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import * as cookieParser from 'cookie-parser';

const configService = new ConfigService();

import * as passport from 'passport';
import * as session from 'express-session';
import { JwtService } from '@nestjs/jwt';
import { WsAuthAdapter } from './adapters/ws-auth.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  const jwtService = app.get(JwtService);
  app.useWebSocketAdapter(new WsAuthAdapter(app, jwtService, configService));

  app.enableCors({
    origin: config.FRONTEND_URL,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
