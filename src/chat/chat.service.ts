import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CHAT_ERROR_MESSAGES, User } from '@app/common';
import { Message } from './message/entities/message.entity';
import { MessageService } from './message/message.service';
import { CreateMessageDto } from './message/dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private readonly messageService: MessageService,
  ) {}

  async createChat(user: User) {
    const newChat = this.chatRepository.create({
      customerId: user.id,
      startTime: new Date(),
      endTime: null,
      isOpen: true,
      messages: [],
    });

    await this.chatRepository.save(newChat);

    const chatWithUser = { ...newChat, user: user };

    return chatWithUser;
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
    await this.chatRepository.update(chat_id, chat);
  }

  async deleteChat(chatId: number) {
    await this.chatRepository.delete({ id: chatId });
  }

  async getChat(chatId: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['messages', 'user'],
    });
    if (!chat) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.CHAT_NOT_FOUND);
    }
    return chat;
  }

  async getAllChats(): Promise<Chat[]> {
    return await this.chatRepository.find({
      relations: ['user'],
    });
  }
}
