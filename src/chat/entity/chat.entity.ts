import { IsBoolean, IsDate, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from '../message/entity/message.entity';
import { User } from '@app/common';
@Entity('Chat')
export class Chat {
  @PrimaryGeneratedColumn()
  chatId: number;

  @Column()
  @IsString()
  customerId: number;

  @Column()
  @IsDate()
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ default: true })
  @IsBoolean()
  isOpen: boolean;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToOne(() => User, (user) => user.chats)
  user: User;
}
