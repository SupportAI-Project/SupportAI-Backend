import { IsNumber } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  customerId: number;
}
