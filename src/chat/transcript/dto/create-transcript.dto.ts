import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Chat } from 'src/chat/entity/chat.model';

export class CreateTranscriptDto {
  @IsBoolean()
  isSupportSender: boolean;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsBoolean()
  isNote: boolean;

  @IsNotEmpty()
  chat: Chat;
}
