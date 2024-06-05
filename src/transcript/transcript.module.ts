import { Module } from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { TranscriptController } from './transcript.controller';

@Module({
  providers: [TranscriptService],
  controllers: [TranscriptController],
})
export class TranscriptModule {}
