import { Module } from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { TranscriptController } from './transcript.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transcript } from './entity/transcript.model';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [ChatModule, TypeOrmModule.forFeature([Transcript])],
  providers: [TranscriptService],
  controllers: [TranscriptController],
  exports: [TranscriptService],
})
export class TranscriptModule {}
