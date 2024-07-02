import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Transcript } from 'src/chat/transcript/entity/transcript.model';
import { Type } from 'class-transformer';

export class UpdateChatDto {
  @IsDate()
  @Type(() => Date)
  start_time?: Date;

  @IsDate()
  @Type(() => Date)
  end_time?: Date;

  @IsNumber()
  customer_id: number;

  @IsBoolean()
  isOpen?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Transcript)
  transcripts?: Transcript[];
}
