import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@app/common';
import { Review } from 'src/review/entities/review.entity';

@Entity('Guide')
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  contentHTML: string;

  @Column()
  @IsString()
  issue: string;

  @Column()
  @IsNumber()
  creatorId: number;

  @Column()
  @IsDate()
  createdAt: Date;

  @OneToMany(() => Review, (review) => review.guide, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reviews: Review[];

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'creatorId' })
  creator: User;
}
