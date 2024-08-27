import { Injectable } from '@nestjs/common';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
  ) {}

  async getOrCreateIssue(): Promise<Issue> {
    let issue = await this.issueRepository.findOne({
      where: { singletonKey: 1 },
    });
    if (!issue) {
      issue = this.issueRepository.create({ categories: [], singletonKey: 1 });
      await this.issueRepository.save(issue);
    }
    return issue;
  }

  async updateIssue(updateIssueDto: UpdateIssueDto): Promise<Issue> {
    const issue = await this.getOrCreateIssue();
    Object.assign(issue, updateIssueDto);
    return await this.issueRepository.save(issue);
  }

  async deleteIssue(): Promise<boolean> {
    const issue = await this.getOrCreateIssue();
    await this.issueRepository.remove(issue);
    return true;
  }
}
