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
    try{
      const newIssue = this.issueRepository.create({
        ...createIssueDto,
      });
      return await this.issueRepository.save(newIssue);

    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException("Error creating issue");
    }
  };

  async getAllIssues(): Promise<Issue[]> {
    try{
      return await this.issueRepository.find();
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException("Error retrieving issues");
    }
  };

  async getIssue(id: number): Promise<Issue> {
    try{
      const issue = await this.issueRepository.findOne({ where: { id } });
      if(!issue) {
        throw new NotFoundException(`Issue with ID ${id} not found`);
      }
      return issue;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException("Error retrieving issue");
    }
  };

  async updateIssue(id: number, updateIssueDto: UpdateIssueDto): Promise<Issue> {
    try{
      await this.issueRepository.update(id, updateIssueDto);
      const updatedIssue = await this.issueRepository.findOne({ where: { id } });
      if (!updatedIssue) {
        throw new NotFoundException(`Issue with ID ${id} not found`);
      };
      return updatedIssue;
    } catch (error){
      Logger.error(error);
      throw new InternalServerErrorException("Error updating issue");
    }
  }

  async deleteIssue(id: number): Promise<boolean> {
    try{
      const result = await this.issueRepository.delete(id);
      if(result.affected === 0){
        return false;
      }
      return true;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException("Error deleting issue");
    }
  }
}
