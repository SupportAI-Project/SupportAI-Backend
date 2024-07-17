import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsBoolean()
  isSupportSender: boolean;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsBoolean()
  isNote?: boolean;

  @IsNotEmpty()
  chatId: number;
}
