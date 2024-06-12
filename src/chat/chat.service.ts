import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entity/chat.model';
import { Repository } from 'typeorm';
import { CreateChatDto, UpdateChatDto } from './dto/chat.dto';
import { ERROR_MESSAGES } from '@app/common/constants/errors/error.messages';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async createChat(chat: CreateChatDto) {
    Logger.log('Creating chat');
    try {
      const newChat = new Chat();

      newChat.customer_id = chat.customer_id;
      newChat.start_time = new Date();
      newChat.isOpen = true;
      newChat.transcripts = [];
      newChat.end_time = null;

      await this.chatRepository.save(newChat);
    } catch (e) {
      Logger.error('Error creating chat', e);
      throw new InternalServerErrorException(ERROR_MESSAGES.CREATE_CHAT_ERROR);
    }
  }
  async updateChat(chat_id: number, chat: UpdateChatDto) {
    try {
      await this.chatRepository.update(chat_id, chat);
    } catch (e) {
      Logger.error('Error updating chat', e);
      throw new InternalServerErrorException(ERROR_MESSAGES.UPDATE_CHAT_ERROR);
    }
  }
  async deleteChat(chat_id: number) {
    try {
      await this.chatRepository.delete({ chat_id });
    } catch (e) {
      Logger.error('Error deleting chat', e);
      throw new InternalServerErrorException(ERROR_MESSAGES.DELETE_CHAT_ERROR);
    }
  }
  async getChat(chat_id: number): Promise<Chat> {
    try {
      return this.chatRepository.findOne({ where: { chat_id } });
    } catch (e) {
      Logger.error('Error getting chat', e);
      throw new InternalServerErrorException(ERROR_MESSAGES.GET_CHAT_ERROR);
    }
  }
  async getAllChats(): Promise<Chat[]> {
    try {
      return this.chatRepository.find();
    } catch (e) {
      Logger.error('Error getting all chats', e);
      throw new InternalServerErrorException(ERROR_MESSAGES.GET_CHATS_ERROR);
    }
  }
}
