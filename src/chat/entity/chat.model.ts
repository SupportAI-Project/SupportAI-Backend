import { Transcript } from 'src/transcript/entity/transcript.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @Column('number') //Need to check if needed
  customer_id: number;

  @Column('date')
  start_time: Date;

  @Column({ nullable: true })
  end_time: Date;

  @Column({ default: 'open' }) //Need to check if needed
  status: string;

  @OneToMany(() => Transcript, (transcript) => transcript.chat)
  transcripts: Transcript[];
}
