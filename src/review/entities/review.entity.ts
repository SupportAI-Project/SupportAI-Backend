import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '@app/common';
import { Guide } from 'src/guide/entities/guide.entity';

@Entity('Review')
@Unique(['userId', 'guideId'])
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  userId: number;

  @Column()
  @IsInt()
  guideId: number;

  @Column({ type: 'int' })
  @IsInt()
  @Min(1, { message: 'Rating must be at least 1 star' })
  @Max(5, { message: 'Rating must be at most 5 stars' })
  rating: number;

  @Column({ type: 'text' })
  @IsString()
  title: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  comment?: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Guide, (guide) => guide.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'guideId' })
  guide: Guide;
}
