import { IsNotEmpty } from 'class-validator';
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
  timestamp: Date;

  @Column('text')
  message: string;

  // @Column({ nullable: true })
  // image_url: string;

  @ManyToOne(() => Chat, (chat) => chat.transcripts)
  chat: Chat;
}
