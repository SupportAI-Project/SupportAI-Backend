import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { Chat } from '@app/common';
import { MessageModule } from './message/message.module';
import { UserModule } from 'src/auth/user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Chat]), MessageModule, UserModule],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
