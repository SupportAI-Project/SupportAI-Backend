import { IsNumber, IsString } from 'class-validator';

export class CreateGuideDto {
  @IsNumber()
  creatorId: number;

  @IsString()
  title: string;

  @IsString()
  contentHTML: string;
}
