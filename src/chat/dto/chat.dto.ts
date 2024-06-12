import { IsNotEmpty } from 'class-validator';
import { Transcript } from 'src/transcript/entity/transcript.model';

export class CreateChatDto {
  @IsNotEmpty()
  customer_id: number;
}

export class UpdateChatDto {
  start_time?: Date;
  end_time?: Date;
  custemer_id?: number;
  isOpen?: boolean;
  transcripts?: Transcript[];
}
