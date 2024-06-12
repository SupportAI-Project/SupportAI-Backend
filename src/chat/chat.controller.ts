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
import { ChatService } from './chat.service';
import { Chat } from './entity/chat.model';
import { CreateChatDto, UpdateChatDto } from './dto/chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getChat(@Param('id') chat_id: number): Promise<Chat> {
    return this.chatService.getChat(chat_id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createChat(@Body() createChatDto: CreateChatDto) {
    await this.chatService.createChat(createChatDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteChat(@Param('id') chat_id: number) {
    await this.chatService.deleteChat(chat_id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllChats(): Promise<Chat[]> {
    return this.chatService.getAllChats();
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async updateChat(
    @Body() updateChatDto: UpdateChatDto,
    @Param('id') chat_id: number,
  ) {
    await this.chatService.updateChat(chat_id, updateChatDto);
  }
}
