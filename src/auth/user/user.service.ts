import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '@app/common/constants/auth/auth.constants';
import { ERROR_MESSAGES } from '@app/common/constants/errors/error.messages';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.password = hashedPassword;
      const newUser = this.userRepository.create(createUserDto);
      if (!newUser) {
        Logger.error('Error creating user');
        throw new InternalServerErrorException(ERROR_MESSAGES.CREATE_USER);
      }
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      Logger.error('Error creating user', error);
      throw new InternalServerErrorException(ERROR_MESSAGES.CREATE_USER);
    }
  }

  async getUser(userIdentifier: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne({
        where: [{ username: userIdentifier }, { email: userIdentifier }],
      });
      return user;
    } catch (error) {
      Logger.error('Error getting user', error);
    }
  }
  async verifyUser(email: string, password: string) {
    try {
      const user = await this.getUser(email);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
      return user;
    } catch (error) {
      Logger.error('Error verifying user', error);
    }
  }
}
