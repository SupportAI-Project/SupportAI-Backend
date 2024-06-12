import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Chat } from 'src/chat/entity/chat.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transcript {
  @PrimaryGeneratedColumn()
  transcript_id: number;

  @Column('boolean')
  @IsNotEmpty()
  isSupportSender: boolean;

  @Column('date')
  @IsNotEmpty()
  @IsDate()
  timestamp: Date;

  @Column('text')
  @IsNotEmpty()
  @IsString()
  message: string;

  @ManyToOne(() => Chat, (chat) => chat.transcripts)
  chat: Chat;
}
