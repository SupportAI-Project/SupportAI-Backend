import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // <-- Add this line
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
