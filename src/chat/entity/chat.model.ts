import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Transcript } from 'src/transcript/entity/transcript.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @Column()
  @IsDate()
  start_time: Date;

  @Column({ nullable: true })
  @IsDate()
  end_time: Date;

  @Column({ default: true })
  @IsBoolean()
  isOpen: boolean;

  @OneToMany(() => Transcript, (transcript) => transcript.chat)
  transcripts: Transcript[];
}
