import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '@app/common';
import { UserModule } from 'src/auth/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ChatModule } from 'src/chat/chat.module';
import { TranscriptModule } from 'src/chat/transcript/transcript.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig()),
    UserModule,
    AuthModule,
    ChatModule,
    TranscriptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
