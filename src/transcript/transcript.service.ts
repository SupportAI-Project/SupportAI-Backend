import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTranscriptDto } from './dto/create-transcript.dto';
import { UpdateTranscriptDto } from './dto/update-transcript.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transcript } from './entity/transcript.model';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from '@app/common/constants/errors/error.messages';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class TranscriptService {
  constructor(
    @InjectRepository(Transcript)
    private transcriptRepository: Repository<Transcript>,
    private chatService: ChatService,
  ) {}

  async createTranscript(transcript: CreateTranscriptDto) {
    try {
      const chat = await this.chatService.getChat(transcript.chatId);
      if (!chat) {
        throw new NotFoundException(ERROR_MESSAGES.CHAT_NOT_FOUND);
      }

      const newTranscript = this.transcriptRepository.create({
        isNote: transcript.isNote,
        message: transcript.message,
        isSupportSender: transcript.isSupportSender,
        timeStamp: new Date(),
      });

      newTranscript.chat = chat;

      await this.transcriptRepository.save(newTranscript);
      return newTranscript;
    } catch (e) {
      Logger.error('Error creating transcript', e);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        ERROR_MESSAGES.CREATE_TRANSCRIPT_ERROR,
      );
    }
  }

  async updateTranscript(id: number, transcript: UpdateTranscriptDto) {
    try {
      await this.transcriptRepository.update(id, transcript);
    } catch (e) {
      Logger.error('Error updating transcript', e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.UPDATE_TRANSCRIPT_ERROR,
      );
    }
  }

  async deleteTranscript(transcriptId: number) {
    try {
      await this.transcriptRepository.delete({ transcriptId: transcriptId });
    } catch (e) {
      Logger.error('Error deleting transcript', e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DELETE_TRANSCRIPT_ERROR,
      );
    }
  }
}
