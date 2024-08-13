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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Upload a new message' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Message successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiBody({ type: CreateMessageDto })
  async uploadMessage(@Body() message: CreateMessageDto) {
    return await this.messageService.createMessage(message);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a message by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Message successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Message not found',
  })
  @ApiBody({ type: UpdateMessageDto })
  @ApiParam({ name: 'id', type: Number, description: 'Message ID' })
  async updateMessage(
    @Body() message: UpdateMessageDto,
    @Param('id') messageId: number,
  ) {
    await this.messageService.updateMessage(messageId, message);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a message by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Message successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Message not found',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Message ID' })
  async deleteMessage(@Param('id') id: number) {
    await this.messageService.deleteMessage(id);
  }
}
