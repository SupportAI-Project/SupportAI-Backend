import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIssueDto {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Categories of the issue',
    example: ['Account Access Issues', 'Payment Processing Errors'],
  })
  categories: string[];
}