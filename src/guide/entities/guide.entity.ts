import {
  IsDate,
  IsNumber,
  IsString,
  IsArray,
  ArrayMaxSize,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../libs/common/src/entities/user.entity';
import { Review } from '../../review/entities/review.entity';

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

  @Column('simple-array')
  @IsArray()
  @ArrayMaxSize(3)
  @IsString({ each: true })
  categories: string[];

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
