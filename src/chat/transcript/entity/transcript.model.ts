import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Chat } from 'src/chat/entity/chat.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Transcript')
export class Transcript {
  @PrimaryGeneratedColumn()
  transcript_id: number;

  @Column()
  @IsBoolean()
  isSupportSender: boolean;

  @Column({ default: false })
  @IsBoolean()
  isNote: boolean;

  @Column()
  @IsDate()
  @Type(() => Date)
  timestamp: Date;

  @Column()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ManyToOne(() => Chat, (chat) => chat.transcripts)
  chat: Chat;
}
