import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Guide } from 'src/guide/entities/guide.entity';
import { ERROR_MESSAGES } from '@app/common';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Guide) private guideRepository: Repository<Guide>,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: number) {
    try {
      const { guideId } = createReviewDto;
      const guide = await this.guideRepository.findOne({ where: { guideId } });
      if (!guide) {
        throw new BadRequestException(`Guide with ID ${guideId} not found`);
      }

      const newReview = await this.reviewRepository.create({
        ...createReviewDto,
        userId,
        createdAt: new Date(),
      });

      const savedReview = await this.reviewRepository.save(newReview);

      await this.guideRepository.save(guide);

      return savedReview;
    } catch (error) {
      if (error.message.includes(ERROR_MESSAGES.UNIQUE_CONSTRAINT_VIOLATION)) {
        throw new BadRequestException('user have already reviewed this guide');
      }
      throw new Error(error);
    }
  }

  async findAll(guideId: number) {
    return this.reviewRepository.find({
      where: { guideId },
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    return this.reviewRepository.findOne({
      where: { reviewId: id },
      relations: ['user'],
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return await this.reviewRepository.update(id, updateReviewDto);
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
