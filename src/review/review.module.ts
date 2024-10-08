import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { GuideModule } from 'src/guide/guide.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), GuideModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
