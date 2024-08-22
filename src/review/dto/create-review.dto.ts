import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'ID of the guide being reviewed',
    example: 1,
  })
  guideId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: 'Rating given by the user (1-5 stars)',
    example: 5,
  })
  rating: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Optional comment provided by the user',
    example: 'This guide was very helpful!',
    required: false,
  })
  comment?: string;
}
