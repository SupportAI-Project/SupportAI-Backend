import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';

@Controller('guide')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGuideDto: CreateGuideDto) {
    return this.guideService.create(createGuideDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllGuides() {
    return this.guideService.getAllGuides();
  }

  @Get(':id')
  async getGuide(@Param('id') id: string) {
    return this.guideService.getGuide(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGuideDto: UpdateGuideDto,
  ) {
    return this.guideService.update(+id, updateGuideDto);
  }

  @Delete(':id')
  async emove(@Param('id') id: string) {
    return this.guideService.remove(+id);
  }
}
