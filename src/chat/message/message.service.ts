import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '@app/common';
import { CHAT_ERROR_MESSAGES } from '@app/common';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createMessage(message: CreateMessageDto) {
    try {
      const newMessage = this.messageRepository.create({
        ...message,
        timeStamp: new Date(),
      });

      return await this.messageRepository.save(newMessage);
    } catch (e) {
      Logger.error('Error creating message', e);
      throw new HttpException(
        e.message || CHAT_ERROR_MESSAGES.CREATE_MESSAGE_ERROR,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateMessage(id: number, message: UpdateMessageDto) {
    try {
      await this.messageRepository.update(id, message);
    } catch (e) {
      Logger.error('Error updating message', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.UPDATE_MESSAGE_ERROR,
      );
    }
  }

  async deleteMessage(messageId: number) {
    try {
      await this.messageRepository.delete({ messageId: messageId });
    } catch (e) {
      Logger.error('Error deleting message', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.DELETE_MESSAGE_ERROR,
      );
    }
  }
}
