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

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createGuideDto: CreateGuideDto) {
    return await this.guideService.create(createGuideDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllGuides() {
    return await this.guideService.getAllGuides();
  }

  @Get(':id')
  async getGuide(@Param('id') id: string) {
    return await this.guideService.getGuide(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGuideDto: UpdateGuideDto,
  ) {
    await this.guideService.update(+id, updateGuideDto);
    return { message: 'Guide updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.guideService.remove(+id);
    return { message: 'Guide deleted successfully' };
  }
}
