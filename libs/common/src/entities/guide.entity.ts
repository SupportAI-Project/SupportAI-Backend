import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@app/common';

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

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'creatorId' })
  creator: User;
}
