import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { Repository } from 'typeorm';
import { CHAT_ERROR_MESSAGES } from '@app/common';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createTranscript(message: CreateMessageDto) {
    try {
      const newMessage = this.messageRepository.create({
        ...message,
        timeStamp: new Date(),
      });

      await this.messageRepository.save(newMessage);

      return newMessage;
    } catch (e) {
      Logger.error('Error creating transcript', e);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.CREATE_TRANSCRIPT_ERROR,
      );
    }
  }

  async updateTranscript(id: number, transcript: UpdateMessageDto) {
    try {
      await this.messageRepository.update(id, transcript);
    } catch (e) {
      Logger.error('Error updating transcript', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.UPDATE_TRANSCRIPT_ERROR,
      );
    }
  }

  async deleteTranscript(transcriptId: number) {
    try {
      await this.messageRepository.delete({ transcriptId: transcriptId });
    } catch (e) {
      Logger.error('Error deleting transcript', e);
      throw new InternalServerErrorException(
        CHAT_ERROR_MESSAGES.DELETE_TRANSCRIPT_ERROR,
      );
    }
  }
}
