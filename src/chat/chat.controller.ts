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
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './entity/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common';

@ApiTags('chats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a chat by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The chat has been successfully retrieved.',
    type: Chat,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Chat not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the chat to retrieve',
    type: Number,
  })
  async getChat(@Param('id') chatId: number): Promise<Chat> {
    return this.chatService.getChat(chatId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new chat' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The chat has been successfully created.',
    type: Chat,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiBody({ type: CreateChatDto })
  async createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return await this.chatService.createChat(createChatDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a chat by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The chat has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Chat not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the chat to delete',
    type: Number,
  })
  async deleteChat(@Param('id') chatId: number) {
    await this.chatService.deleteChat(chatId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all chats' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The chats have been successfully retrieved.',
    type: [Chat],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async getAllChats(): Promise<Chat[]> {
    return this.chatService.getAllChats();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a chat by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The chat has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Chat not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the chat to update',
    type: Number,
  })
  @ApiBody({ type: UpdateChatDto })
  async updateChat(
    @Body() updateChatDto: UpdateChatDto,
    @Param('id') chatId: number,
  ) {
    await this.chatService.updateChat(chatId, updateChatDto);
  }
}
