import { IsBoolean, IsDate, IsNumber } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from '../message/entities/message.entity';
import { User } from '@app/common';
@Entity('Chat')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
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
  @JoinColumn({ name: 'customerId' })
  user: User;
}
