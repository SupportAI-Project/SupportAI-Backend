import { Controller, Get, Patch, Body } from '@nestjs/common';
import { IssueService } from './issue.service';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('issues')
@Controller('issues')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve the single issue instance' })
  async getIssue() {
    return this.issueService.getOrCreateIssue();
  }

  @Patch()
  @ApiOperation({ summary: 'Update the single issue instance' })
  @ApiBody({ type: UpdateIssueDto })
  async updateIssue(@Body() updateIssueDto: UpdateIssueDto) {
    await this.issueService.updateIssue(updateIssueDto);
    return { message: 'Issue updated successfully' };
  }
}
