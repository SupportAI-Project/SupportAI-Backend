import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@app/common';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    description: 'Password of the user',
    example: 'Str0ngP@ssw0rd!',
  })
  password: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'Array of roles assigned to the user',
    example: ['user', 'assistant', 'system', 'function'],
    required: false,
  })
  roles?: Role[];
}
