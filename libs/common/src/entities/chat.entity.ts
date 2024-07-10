import { IsBoolean, IsDate, IsNumber } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';
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

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
