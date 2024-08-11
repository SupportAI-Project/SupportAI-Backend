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
  async findAll() {
    return this.guideService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.guideService.findOne(+id);
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
