import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CHAT_ERROR_MESSAGES } from '@app/common';
import { Message } from '@app/common';
import { MessageService } from './message/message.service';
import { UserService } from 'src/auth/user/user.service';
import { CreateMessageDto } from './message/dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  async createChat(createChatDto: CreateChatDto) {
    try {
      const newChat = await this.chatRepository.create({
        ...createChatDto,
        startTime: new Date(),
        endTime: null,
        isOpen: true,
        messages: [],
      });

      return await this.chatRepository.save(newChat);
    } catch (e) {
      Logger.error('Error creating chat', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.CREATE_CHAT_ERROR,
      );
    }
  }

  async sendMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = await this.messageService.createMessage({
      ...createMessageDto,
      isNote: createMessageDto.isNote || false,
    });
    const chat = await this.getChat(createMessageDto.chatId);
    chat.messages.push(message);
    await this.chatRepository.save(chat);
    return message;
  }

  async updateChat(chat_id: number, chat: UpdateChatDto) {
    try {
      await this.chatRepository.update(chat_id, chat);
    } catch (e) {
      Logger.error('Error updating chat', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.UPDATE_CHAT_ERROR,
      );
    }
  }

  async deleteChat(chatId: number) {
    try {
      await this.chatRepository.delete({ chatId });
    } catch (e) {
      Logger.error('Error deleting chat', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.DELETE_CHAT_ERROR,
      );
    }
  }
  async getChat(chatId: number): Promise<Chat> {
    try {
      const chat = await this.chatRepository.findOne({
        where: { chatId },
        relations: ['messages'],
      });
      if (!chat) {
        throw new NotFoundException(CHAT_ERROR_MESSAGES.CHAT_NOT_FOUND);
      }
      return chat;
    } catch (e) {
      Logger.error('Error getting chat', e);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.GET_CHAT_ERROR,
      );
    }
  }

  async getAllChats(): Promise<Chat[]> {
    try {
      return this.chatRepository.find({
        relations: ['user'],
      });
    } catch (e) {
      Logger.error('Error getting all chats', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.GET_CHATS_ERROR,
      );
    }
  }
}
