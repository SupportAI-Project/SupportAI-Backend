import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TranscriptModule } from './transcript/transcript.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entity/chat.model';

@Module({
  imports: [TranscriptModule, 
    TypeOrmModule.forFeature([Chat])
  ],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
