import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateTranscriptDto {
  @IsDate()
  @Type(() => Date)
  timestamp?: Date;

  @IsString()
  message?: string;

  @IsBoolean()
  isNote?: boolean;

  @IsBoolean()
  isSupportSender?: boolean;
}
