import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard, RolesGuard } from '@app/common';
import { ChatModule } from 'src/chat/chat.module';
import { UserModule } from 'src/auth/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MessageModule } from 'src/chat/message/message.module';
import { LoggerModule } from 'nestjs-pino';
import { HttpExceptionFilter } from '@app/common';
import { GuideModule } from 'src/guide/guide.module';
import { ReviewModule } from 'src/review/review.module';
import { IssueModule } from 'src/issue/issue.module';
import { configDataSource } from 'src/database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configDataSource),
    LoggerModule.forRoot({
      pinoHttp: {
        customLogLevel: (res) => {
          if (res && res.statusCode >= 500) return 'error';
          if (res && res.statusCode >= 400) return 'warn';
          return 'info';
        },
        timestamp: () =>
          `,"time":"${new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'Asia/Jerusalem',
          })}"`,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
            levelFirst: true,
            translateTime: false,
            messageFormat: `[SupportAI] | {context} {req.method} {req.url} {res.statusCode} - {msg}`,
            ignore: 'pid,hostname,res.headers',
            customLevels: {
              trace: 10,
              debug: 20,
              info: 30,
              warn: 40,
              error: 50,
            },
            level: 'trace',
          },
        },
        serializers: {
          req: (req) => ({
            method: req.method,
            url: req.url,
          }),
          res: (res) => ({
            statusCode: res.statusCode,
            responseTime: res.responseTime,
          }),
        },
      },
    }),
    ChatModule,
    UserModule,
    AuthModule,
    MessageModule,
    GuideModule,
    ReviewModule,
    IssueModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
