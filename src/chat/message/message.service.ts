import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../../libs/common/src/entities/message.entity';
import { Repository } from 'typeorm';
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

      await this.messageRepository.save(newMessage);

      return newMessage;
    } catch (e) {
      Logger.error('Error creating transcript', e);
      throw new HttpException(
        e.message || CHAT_ERROR_MESSAGES.CREATE_TRANSCRIPT_ERROR,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateMessage(id: number, transcript: UpdateMessageDto) {
    try {
      await this.messageRepository.update(id, transcript);
    } catch (e) {
      Logger.error('Error updating transcript', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.UPDATE_TRANSCRIPT_ERROR,
      );
    }
  }

  async deleteMessage(transcriptId: number) {
    try {
      await this.messageRepository.delete({ messageId: transcriptId });
    } catch (e) {
      Logger.error('Error deleting transcript', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.DELETE_TRANSCRIPT_ERROR,
      );
    }
  }
}
