import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { CreateTranscriptDto, UpdateTranscriptDto } from './dto/transcript.dto';
import { Transcript } from './entity/transcript.model';

@Controller('transcripts')
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  async uploadTranscript(@Body() transcript: CreateTranscriptDto) {
    await this.transcriptService.createTranscript(transcript);
  }

  @Post(':id') // id is transcript_id
  @HttpCode(HttpStatus.OK)
  async updateTranscript(
    @Body() transcript: UpdateTranscriptDto,
    @Param('id') id: number,
  ) {
    await this.transcriptService.updateTranscript(id, transcript);
  }

  @Get(':id') //Id is chat_id
  @HttpCode(HttpStatus.OK)
  async getTranscripts(@Param('id') chat_id: number): Promise<Transcript[]> {
    return this.transcriptService.getTranscripts(chat_id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTranscript(@Param('id') id: number) {
    await this.transcriptService.deleteTranscript(id);
  }
}
