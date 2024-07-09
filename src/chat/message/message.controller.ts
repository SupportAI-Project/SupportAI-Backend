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

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async uploadMessage(@Body() message: CreateMessageDto) {
    return await this.messageService.createMessage(message);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async updateMessage(
    @Body() message: UpdateMessageDto,
    @Param('id') messageId: number,
  ) {
    await this.messageService.updateMessage(messageId, message);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteMessage(@Param('id') id: number) {
    await this.messageService.deleteMessage(id);
  }
}
