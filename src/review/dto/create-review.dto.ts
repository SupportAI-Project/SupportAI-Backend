import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'ID of the guide being reviewed',
    example: 1,
  })
  guideId: number;

  @ApiProperty({
    description: 'Rating given by the user (1-5 stars)',
    example: 5,
  })
  stars: number;

  @ApiProperty({
    description: 'Optional comment provided by the user',
    example: 'This guide was very helpful!',
    required: false,
  })
  comment?: string;
}
