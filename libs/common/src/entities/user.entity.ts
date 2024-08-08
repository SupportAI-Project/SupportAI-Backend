import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Role } from '../types';
import { Chat } from '../../../../src/entities/chat.entity';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column()
  @IsStrongPassword()
  password: string;

  @Column('simple-array', { nullable: true })
  @IsArray()
  @IsOptional()
  roles?: Role[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];
}
