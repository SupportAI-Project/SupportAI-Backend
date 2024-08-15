import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from '@app/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new chat' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Chat successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiBody({ type: CreateChatDto })
  async createChat(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.createChat(createChatDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all chats' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all chats' })
  async getAllChats(): Promise<Chat[]> {
    return this.chatService.getAllChats();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a chat by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Chat found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Chat not found' })
  @ApiParam({ name: 'id', type: Number, description: 'Chat ID' })
  async getChat(@Param('id') chatId: number): Promise<Chat> {
    return this.chatService.getChat(chatId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a chat by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chat successfully deleted',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Chat not found' })
  @ApiParam({ name: 'id', type: Number, description: 'Chat ID' })
  async deleteChat(@Param('id') chatId: number) {
    await this.chatService.deleteChat(chatId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a chat by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chat successfully updated',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Chat not found' })
  @ApiBody({ type: UpdateChatDto })
  @ApiParam({ name: 'id', type: Number, description: 'Chat ID' })
  async updateChat(
    @Body() updateChatDto: UpdateChatDto,
    @Param('id') chatId: number,
  ) {
    await this.chatService.updateChat(chatId, updateChatDto);
  }
}
