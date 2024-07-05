import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Role } from '../interfaces/role.enum';
import { Chat } from 'src/chat/entity/chat.model';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column()
  @IsStrongPassword()
  password: string;

  @Column('simple-array', { nullable: true })
  @IsArray()
  @IsOptional()
  roles?: Role[];

  @OneToOne(() => Chat, (chat) => chat.customer)
  @IsOptional()
  chat?: Chat;
}
