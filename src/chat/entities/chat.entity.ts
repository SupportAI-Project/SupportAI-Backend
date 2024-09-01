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
import type { User } from '../../../libs/common/src/entities/user.entity';
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

  @ManyToOne('User', (user: User) => user.chats)
  @JoinColumn({ name: 'customerId' })
  user: User;
}
