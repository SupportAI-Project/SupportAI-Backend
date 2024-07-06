import { IsBoolean, IsDate, IsNumber } from 'class-validator';
import { Transcript } from '../transcript/entity/transcript.entity';
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

  @OneToMany(() => Transcript, (transcript) => transcript.chat)
  transcripts: Transcript[];

  @OneToOne(() => User, (user) => user.chat)
  @JoinColumn({ name: 'customerId' })
  customer: User;
}
