import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsDate()
  @Type(() => Date)
  timeStamp?: Date;

  @IsString()
  content?: string;

  @IsBoolean()
  isNote?: boolean;

  @IsBoolean()
  isSupportSender?: boolean;
}
