import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTranscriptDto {
  @IsBoolean()
  isSupportSender: boolean;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsBoolean()
  isNote: boolean;

  @IsNotEmpty()
  chatId: number;
}
