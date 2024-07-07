import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('transcripts')
export class MessageController {
  constructor(private readonly transcriptService: MessageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async uploadTranscript(@Body() message: CreateMessageDto) {
    return await this.transcriptService.createMessage(message);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async updateTranscript(
    @Body() transcript: UpdateMessageDto,
    @Param('id') transcriptId: number,
  ) {
    await this.transcriptService.updateMessage(transcriptId, transcript);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTranscript(@Param('id') id: number) {
    await this.transcriptService.deleteMessage(id);
  }
}
