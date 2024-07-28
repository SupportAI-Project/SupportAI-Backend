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
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SupportAI')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

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
  await app.listen(8080);
}
bootstrap();
