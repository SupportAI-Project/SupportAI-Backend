import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guide } from '../../libs/common/src/entities/guide.entity';

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
    return await this.guideRepository.find();
  }

  async getGuide(guideId: number) {
    const guide = await this.guideRepository.findOne({ where: { guideId } });
    if (!guide) {
      throw new NotFoundException(`Guide with ID ${guideId} not found`);
    }
    return guide;
  }

  async update(id: number, updateGuideDto: UpdateGuideDto) {
    await this.guideRepository.update(id, updateGuideDto);
  }

  async remove(id: number) {
    await this.guideRepository.delete(id);
  }
}
