import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { CreateTranscriptDto, UpdateTranscriptDto } from './dto/transcript.dto';
import { Transcript } from './entity/transcript.model';

@Controller('transcripts')
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}

  // @Post('file')
  // @HttpCode(HttpStatus.CREATED)
  // uploadFileAndPassValidation(
  //   @Body() body: CreateTranscriptDto,
  //   @UploadedFile(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: 'jpeg', // Only allow jpeg files
  //       })
  //       .addMaxSizeValidator({
  //         maxSize: 1000, //Max image size is 1KB
  //       })
  //       .build({
  //         errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //       }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   //Need to check if need to return the file or not
  //   // and is it transcript or just file
  //   this.transcriptService.uploadTranscript(body);
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }

  // @Get('file/:id')
  // @HttpCode(HttpStatus.OK)
  // async getFiles(@Param('id') id: string) {
  //   return this.transcriptService.getFile(id);
  // }

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  async uploadTranscript(@Body() transcript: CreateTranscriptDto) {
    await this.transcriptService.createTranscript(transcript);
  }

  @Post(':id') // id is transcript_id
  @HttpCode(HttpStatus.OK)
  async updateTranscript(
    @Body() transcript: UpdateTranscriptDto,
    @Param('id') id: number,
  ) {
    await this.transcriptService.updateTranscript(id, transcript);
  }

  @Get(':id') //Id is chat_id
  @HttpCode(HttpStatus.OK)
  async getTranscripts(@Param('id') chat_id: number): Promise<Transcript[]> {
    return this.transcriptService.getTranscripts(chat_id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTranscript(@Param('id') id: number) {
    await this.transcriptService.deleteTranscript(id);
  }
}
