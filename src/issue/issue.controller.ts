import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { Issue } from './entities/issue.entity';

@ApiTags('issues')
@Controller('issues')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new issue' })
  @ApiBody({ type: CreateIssueDto })
  async create(
    @Body() createIssueDto: CreateIssueDto
  ) {
    return this.issueService.createIssue(createIssueDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all issues' })
  async getAllIssues() {
    return this.issueService.getAllIssues();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an issue by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Issue ID' })
  async getIssue(
    @Param('id') id: string
  ) {
    return this.issueService.getIssue(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an issue by ID' })
  @ApiBody({ type: UpdateIssueDto })
  @ApiParam({ name: 'id', type: String, description: 'Issue ID' })
  async updateIssue(
    @Param('id') id: string, 
  @Body() updateIssueDto: UpdateIssueDto
) {
    await this.issueService.updateIssue(+id, updateIssueDto);
    return { message: 'Issue updated successfully' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an issue by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Issue ID' })
  async deleteIssue(
    @Param('id') id: string
  ) {
    await this.issueService.deleteIssue(+id);
    return { message: 'Issue deleted successfully' };
  }
}
