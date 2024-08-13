import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CurrentUser, User } from '@app/common';

@ApiTags('guides')
@Controller('guides')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new guide' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Guide successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiBody({ type: CreateGuideDto })
  async create(
    @Body() createGuideDto: CreateGuideDto,
    @CurrentUser() user: User,
  ) {
    return await this.guideService.create(createGuideDto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all guides' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all guides' })
  async getAllGuides() {
    return await this.guideService.getAllGuides();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a guide by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Guide found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Guide not found' })
  @ApiParam({ name: 'id', type: String, description: 'Guide ID' })
  async getGuide(@Param('id') id: string) {
    return await this.guideService.getGuide(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a guide by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Guide successfully updated',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Guide not found' })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Guide successfully deleted',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Guide not found' })
  @ApiParam({ name: 'id', type: String, description: 'Guide ID' })
  async remove(@Param('id') id: string) {
    await this.guideService.remove(+id);
    return { message: 'Guide deleted successfully' };
  }
}
