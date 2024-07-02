import { IsNumber } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  customer_id: number;
}
