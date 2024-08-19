import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser, User } from '@app/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Review successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiBody({ type: CreateReviewDto })
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() { userId }: User,
  ) {
    return this.reviewService.create(createReviewDto, userId);
  }

  @Get('guide/:guideId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all reviews of a guide by guide id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all reviews' })
  async findAll(@Param('guideId') guideId: string) {
    return this.reviewService.findAll(+guideId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a review by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Review found' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Review not found',
  })
  @ApiParam({ name: 'id', type: String, description: 'Review ID' })
  async findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a review by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Review successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Review not found',
  })
  @ApiBody({ type: UpdateReviewDto })
  @ApiParam({ name: 'id', type: String, description: 'Review ID' })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Review successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Review not found',
  })
  @ApiParam({ name: 'id', type: String, description: 'Review ID' })
  async remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}