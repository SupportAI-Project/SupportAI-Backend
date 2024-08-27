import { IsArray, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Issue')
export class Issue {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column('simple-array')
  @IsArray()
  @IsString({ each: true })
  categories: string[];
}