import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { CreateTranscriptDto } from './dto/create-transcript.dto';
import { UpdateTranscriptDto } from './dto/update-transcript.dto';

@Controller('transcripts')
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async uploadTranscript(@Body() transcript: CreateTranscriptDto) {
    await this.transcriptService.createTranscript(transcript);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async updateTranscript(
    @Body() transcript: UpdateTranscriptDto,
    @Param('id') transcriptId: number,
  ) {
    await this.transcriptService.updateTranscript(transcriptId, transcript);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTranscript(@Param('id') id: number) {
    await this.transcriptService.deleteTranscript(id);
  }
}
