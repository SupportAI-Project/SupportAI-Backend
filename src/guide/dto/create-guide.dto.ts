import { ArrayMaxSize, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGuideDto {
  @IsString()
  @ApiProperty({
    description: 'Title of the guide',
    example: 'How to use Swagger with NestJS',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Content of the guide in HTML format',
    example: '<p>This is a guide on how to use Swagger with NestJS.</p>',
  })
  contentHTML: string;

  @IsArray()
  @ArrayMaxSize(3)
  @IsString({ each: true })
  @ApiProperty({
    description: 'up to 3 tags to categorize the guide',
    example: ['NestJS', 'Swagger', 'API'],
  })
  tags: string[];
}
