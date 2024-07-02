import { IsBoolean, IsDate, IsNumber } from 'class-validator';
import { Transcript } from 'src/chat/transcript/entity/transcript.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Chat')
export class Chat {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @Column()
  @IsNumber()
  customer_id: number;

  @Column()
  @IsDate()
  start_time: Date;

  @Column({ nullable: true })
  end_time: Date;

  @Column({ default: true })
  @IsBoolean()
  isOpen: boolean;

  @OneToMany(() => Transcript, (transcript) => transcript.chat)
  transcripts: Transcript[];
}
