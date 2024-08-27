import { IsString } from 'class-validator';
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

  @IsString()
  @ApiProperty({
    description: 'Issue that the guide is about',
    example: 'Swagger',
  })
  issue: string;
}
