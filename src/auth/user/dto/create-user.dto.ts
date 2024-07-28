import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password for the user',
    example: 'Str0ngP@ssw0rd!',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'The roles assigned to the user',
    example: ['admin', 'user'],
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  roles?: Role[];
}
