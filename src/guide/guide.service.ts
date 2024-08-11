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

  async create(createGuideDto: CreateGuideDto) {
    const newGuide = this.guideRepository.create({
      ...createGuideDto,
      createdAt: new Date(),
    });
    return await this.guideRepository.save(newGuide);
  }

  async findAll() {
    return `This action returns all guide`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} guide`;
  }

  async update(id: number, updateGuideDto: UpdateGuideDto) {
    return `This action updates a #${id} guide`;
  }

  async remove(id: number) {
    return `This action removes a #${id} guide`;
  }
}
