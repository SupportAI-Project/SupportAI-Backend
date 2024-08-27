import { Module } from '@nestjs/common';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { Issue } from 'src/issue/entities/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guide, Issue])],
  controllers: [GuideController],
  providers: [GuideService],
})
export class GuideModule {}
