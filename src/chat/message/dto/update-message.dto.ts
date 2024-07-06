import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsDate()
  @Type(() => Date)
  timeStamp?: Date;

  @IsString()
  message?: string;

  @IsBoolean()
  isNote?: boolean;

  @IsBoolean()
  isSupportSender?: boolean;
}
