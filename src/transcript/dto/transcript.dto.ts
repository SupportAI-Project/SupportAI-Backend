import { IsNotEmpty } from 'class-validator';
import { Chat } from 'src/chat/entity/chat.model';

export class CreateTranscriptDto {
  @IsNotEmpty()
  isSupportSender: boolean;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  chat: Chat;
}

export class UpdateTranscriptDto {
  timestamp?: Date;
  message: string;
}
