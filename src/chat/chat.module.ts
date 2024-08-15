import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { Chat } from './entities/chat.entity';
import { MessageModule } from './message/message.module';
import { UserModule } from 'src/auth/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    MessageModule,
    UserModule,
    AuthModule,
  ],
  providers: [ChatService, ChatGateway, AuthService, JwtService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
