import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
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

  async createIssue(createIssueDto: CreateIssueDto): Promise<Issue> {
    const newIssue = this.issueRepository.create({
      ...createIssueDto,
    });
    return await this.issueRepository.save(newIssue);
  };

  async getAllIssues(): Promise<Issue[]> {
    return await this.issueRepository.find();
  };

  async getIssue(id: number): Promise<Issue> {
    const issue = await this.issueRepository.findOne({ where: { id } });
    if(!issue) {
      Logger.error(`Issue with ID ${id} not found`);
    }
    return issue;
  };

  async updateIssue(id: number, updateIssueDto: UpdateIssueDto): Promise<Issue> {
    await this.issueRepository.update(id, updateIssueDto);
    const updatedIssue = await this.issueRepository.findOne({ where: { id } });
    if (!updatedIssue) {
      Logger.error(`Issue with ID ${id} not found`);
    };
    return updatedIssue;
  }

  async deleteIssue(id: number): Promise<boolean> {
    const result = await this.issueRepository.delete(id);
    if(result.affected === 0){
      return false;
    }
    return true;
  }
}
