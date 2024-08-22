import { Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guide } from './entities/guide.entity';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide) private guideRepository: Repository<Guide>,
  ) {}

  async create(createGuideDto: CreateGuideDto, userId: number) {
    const newGuide = await this.guideRepository.create({
      ...createGuideDto,
      createdAt: new Date(),
      creatorId: userId,
    });
    return await this.guideRepository.save(newGuide);
  }

  async getAllGuides() {
    return await this.guideRepository.find({
      relations: ['creator', 'reviews', 'reviews.user'],
    });
  }

  async getGuide(guideId: number) {
    return await this.guideRepository.findOne({
      where: { id: guideId },
      relations: ['creator', 'reviews', 'reviews.user'],
    });
  }

  async update(id: number, updateGuideDto: UpdateGuideDto) {
    await this.guideRepository.update(id, updateGuideDto);
  }

  async remove(id: number) {
    await this.guideRepository.delete(id);
  }
}
