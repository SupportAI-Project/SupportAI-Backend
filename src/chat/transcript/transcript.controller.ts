import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { CreateTranscriptDto } from './dto/create-transcript.dto';
import { UpdateTranscriptDto } from './dto/update-transcript.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common';

@ApiTags('transcripts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transcripts')
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Upload a new transcript' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The transcript has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiBody({ type: CreateTranscriptDto })
  async uploadTranscript(@Body() transcript: CreateTranscriptDto) {
    return await this.transcriptService.createTranscript(transcript);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing transcript' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The transcript has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the transcript to update',
    type: Number,
  })
  @ApiBody({ type: UpdateTranscriptDto })
  async updateTranscript(
    @Body() transcript: UpdateTranscriptDto,
    @Param('id') transcriptId: number,
  ) {
    await this.transcriptService.updateTranscript(transcriptId, transcript);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a transcript' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The transcript has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the transcript to delete',
    type: Number,
  })
  async deleteTranscript(@Param('id') id: number) {
    await this.transcriptService.deleteTranscript(id);
  }
}
