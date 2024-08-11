import { Module } from '@nestjs/common';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Guide])],
  controllers: [GuideController],
  providers: [GuideService, JwtService],
})
export class GuideModule {}