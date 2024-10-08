import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Chat } from '../../entities/chat.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsBoolean()
  isSupportSender: boolean;

  @Column({ default: false })
  @IsBoolean()
  isNote: boolean;

  @Column()
  @IsDate()
  @Type(() => Date)
  timeStamp: Date;

  @Column()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Column()
  chatId: number;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;
}
