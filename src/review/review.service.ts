import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: number) {
    try {
      const newReview = await this.reviewRepository.create({
        ...createReviewDto,
        userId,
        createdAt: new Date(),
      });

      const savedReview = await this.reviewRepository.save(newReview);

      return savedReview;
    } catch (error) {
      if (
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new BadRequestException('user have already reviewed this guide');
      }
      throw new Error(error);
    }
  }

  async findAll() {
    return this.reviewRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    return this.reviewRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return await this.reviewRepository.update(id, updateReviewDto);
  }

  async remove(id: number) {
    return await this.reviewRepository.delete(id);
  }
}
