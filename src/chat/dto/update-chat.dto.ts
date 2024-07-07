import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Message } from '../../../libs/common/src/entities/message.entity';
import { Type } from 'class-transformer';

export class UpdateChatDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startTime?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endTime?: Date;

  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Message)
  transcripts?: Message[];
}
