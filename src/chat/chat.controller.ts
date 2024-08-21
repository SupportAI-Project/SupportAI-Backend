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
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { CurrentUser, User } from '@app/common';

@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new chat' })
  @ApiBody({ type: CreateChatDto })
  async createChat(
    @Body() createChatDto: CreateChatDto,
    @CurrentUser() { userId }: User,
  ) {
    return await this.chatService.createChat(createChatDto, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all chats' })
  async getAllChats(): Promise<Chat[]> {
    return this.chatService.getAllChats();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a chat by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Chat ID' })
  async getChat(@Param('id') chatId: number): Promise<Chat> {
    return this.chatService.getChat(chatId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a chat by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Chat ID' })
  async deleteChat(@Param('id') chatId: number) {
    await this.chatService.deleteChat(chatId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a chat by ID' })
  @ApiBody({ type: UpdateChatDto })
  @ApiParam({ name: 'id', type: Number, description: 'Chat ID' })
  async updateChat(
    @Body() updateChatDto: UpdateChatDto,
    @Param('id') chatId: number,
  ) {
    await this.chatService.updateChat(chatId, updateChatDto);
  }
}
