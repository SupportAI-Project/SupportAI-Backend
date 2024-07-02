import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTranscriptDto } from './dto/create-transcript.dto';
import { UpdateTranscriptDto } from './dto/update-transcript.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transcript } from './entity/transcript.model';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from '@app/common/constants/errors/error.messages';

@Injectable()
export class TranscriptService {
  constructor(
    @InjectRepository(Transcript)
    private transcriptRepository: Repository<Transcript>,
  ) {}

  async getTranscripts(chat_id: number): Promise<Transcript[]> {
    try {
      return this.transcriptRepository.find({
        where: { chat: { chat_id: chat_id } },
      });
    } catch (e) {
      Logger.error('Error getting all transcripts', e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.GET_TRANSCRIPTS_ERROR,
      );
    }
  }
  async createTranscript(transcript: CreateTranscriptDto) {
    try {
      const newTranscript = {
        ...transcript,
        timestamp: new Date(),
      };

      await this.transcriptRepository.save(newTranscript);
    } catch (e) {
      Logger.error('Error creating transcript', e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.CREATE_TRANSCRIPT_ERROR,
      );
    }
  }

  async createTranscriptArray(transcripts: CreateTranscriptDto[]) {
    const promises = transcripts.map(async (transcript) => {
      const newTranscript = {
        ...transcript,
        timestamp: new Date(),
      };
      this.transcriptRepository.save(newTranscript);
    });

    await Promise.all(promises);
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

  async deleteTranscript(transcript_id: number) {
    try {
      await this.transcriptRepository.delete({ transcript_id: transcript_id });
    } catch (e) {
      Logger.error('Error deleting transcript', e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.DELETE_TRANSCRIPT_ERROR,
      );
    }
  }
}