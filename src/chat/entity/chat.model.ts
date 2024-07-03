import { IsBoolean, IsDate, IsNumber } from 'class-validator';
import { Transcript } from '../transcript/entity/transcript.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Transcript, (transcript) => transcript.chat)
  transcripts: Transcript[];
}
