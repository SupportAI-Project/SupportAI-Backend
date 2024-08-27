import { IsArray, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('Issue')
@Unique(['singletonKey'])
export class Issue {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column('simple-array')
  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @Column({ default: 1 })
  singletonKey: number;
}
