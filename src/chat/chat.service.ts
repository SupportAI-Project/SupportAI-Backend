import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entity/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CHAT_ERROR_MESSAGES } from '@app/common';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async createChat(chat: CreateChatDto) {
    try {
      const newChat = await this.chatRepository.create({
        ...chat,
        startTime: new Date(),
        isOpen: true,
        messages: [],
        endTime: null,
      });

      await this.chatRepository.save(newChat);
      return newChat;
    } catch (e) {
      Logger.error('Error creating chat', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.CREATE_CHAT_ERROR,
      );
    }
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
        relations: ['transcripts'],
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
      return this.chatRepository.find();
    } catch (e) {
      Logger.error('Error getting all chats', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.GET_CHATS_ERROR,
      );
    }
  }
}
