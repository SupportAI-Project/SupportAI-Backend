import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a new message' })
  @ApiBody({ type: CreateMessageDto })
  async uploadMessage(@Body() message: CreateMessageDto) {
    return await this.messageService.createMessage(message);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Update a message by ID' })
  @ApiBody({ type: UpdateMessageDto })
  @ApiParam({ name: 'id', type: Number, description: 'Message ID' })
  async updateMessage(
    @Body() message: UpdateMessageDto,
    @Param('id') messageId: number,
  ) {
    await this.messageService.updateMessage(messageId, message);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a message by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Message ID' })
  async deleteMessage(@Param('id') id: number) {
    await this.messageService.deleteMessage(id);
  }
}
