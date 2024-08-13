import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Indicates if the sender is a support representative',
    example: true,
  })
  isSupportSender: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello, how can I help you today?',
  })
  content: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Indicates if the message is a note',
    example: false,
    required: false,
  })
  isNote?: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the chat to which the message belongs',
    example: 456,
  })
  chatId: number;
}
