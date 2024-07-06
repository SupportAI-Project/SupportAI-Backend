import { IsBoolean, IsDate, IsNumber } from 'class-validator';
import { Message } from '../message/entity/message.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@app/common';
@Entity('Chat')
export class Chat {
  @PrimaryGeneratedColumn()
  chatId: number;

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

  @OneToMany(() => Message, (transcript) => transcript.chat)
  messages: Message[];

  @OneToOne(() => User, (user) => user.chat)
  @JoinColumn({ name: 'customerId' })
  customer: User;
}
