import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { CurrentUser, User } from '@app/common';

@ApiTags('guides')
@Controller('guides')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new guide' })
  @ApiBody({ type: CreateGuideDto })
  async create(
    @Body() createGuideDto: CreateGuideDto,
    @CurrentUser() { id: userId }: User,
  ) {
    return await this.guideService.create(createGuideDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all guides' })
  async getAllGuides() {
    return await this.guideService.getAllGuides();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a guide by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Guide ID' })
  async getGuide(@Param('id') id: string) {
    return await this.guideService.getGuide(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a guide by ID' })
  @ApiBody({ type: UpdateGuideDto })
  @ApiParam({ name: 'id', type: String, description: 'Guide ID' })
  async update(
    @Param('id') id: string,
    @Body() updateGuideDto: UpdateGuideDto,
  ) {
    await this.guideService.update(+id, updateGuideDto);
    return { message: 'Guide updated successfully' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a guide by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Guide ID' })
  async remove(@Param('id') id: string) {
    await this.guideService.remove(+id);
    return { message: 'Guide deleted successfully' };
  }
}
