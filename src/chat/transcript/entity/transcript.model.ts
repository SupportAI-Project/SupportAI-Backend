import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Chat } from '../../entity/chat.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Transcript')
export class Transcript {
  @PrimaryGeneratedColumn()
  transcriptId: number;

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
  message: string;

  @Column({ name: 'chatId' })
  chatId: number;

  @ManyToOne(() => Chat, (chat) => chat.transcripts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;
}