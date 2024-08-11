import { IsDate, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Guide')
export class Guide {
  @PrimaryGeneratedColumn()
  guideId: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  contentHTML: string;

  @Column()
  @IsNumber()
  creatorId: number;

  @Column()
  @IsDate()
  createdAt: Date;
}
