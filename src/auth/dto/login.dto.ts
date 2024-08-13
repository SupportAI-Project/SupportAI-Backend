import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Password of the user',
    example: 'Str0ngP@ssw0rd!',
  })
  password: string;
}
