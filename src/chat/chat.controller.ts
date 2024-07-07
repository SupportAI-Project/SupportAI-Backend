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
import { Chat } from '../../libs/common/src/entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getChat(@Param('id') chatId: number): Promise<Chat> {
    return this.chatService.getChat(chatId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createChat(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.createChat(createChatDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteChat(@Param('id') chatId: number) {
    await this.chatService.deleteChat(chatId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllChats(): Promise<Chat[]> {
    return this.chatService.getAllChats();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateChat(
    @Body() updateChatDto: UpdateChatDto,
    @Param('id') chatId: number,
  ) {
    await this.chatService.updateChat(chatId, updateChatDto);
  }
}
