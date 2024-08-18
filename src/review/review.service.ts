import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Guide } from 'src/guide/entities/guide.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Guide) private guideRepository: Repository<Guide>,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: number) {
    const { guideId, stars } = createReviewDto;
    const guide = await this.guideRepository.findOne({ where: { guideId } });
    if (!guide) {
      throw new BadRequestException(`Guide with ID ${guideId} not found`);
    }
    const newReview = await this.reviewRepository.create({
      ...createReviewDto,
      userId,
      createdAt: new Date(),
    });
    guide.starsTotalSum += stars;
    guide.reviews.push(newReview);
    await this.guideRepository.save(guide);
    return await this.reviewRepository.save(newReview);
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
