import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, USER_ERROR_MESSAGES } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '@app/common';
import { Role } from '@app/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const { username, password, email, roles = [Role.USER] } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = this.userRepository.create({
        username,
        password: hashedPassword,
        email,
        roles: roles,
      });
      if (!newUser) {
        Logger.error('Error creating user');
        throw new InternalServerErrorException(USER_ERROR_MESSAGES.CREATE_USER);
      }
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(USER_ERROR_MESSAGES.CREATE_USER);
    }
  }

  async getUser(userIdentifier: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: [{ username: userIdentifier }, { email: userIdentifier }],
    });
    return user;
  }

  async verifyUser(username: string, password: string) {
    const user = await this.getUser(username);
    if (!user) {
      throw new UnauthorizedException(USER_ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(USER_ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    return user;
  }

  async validateCreateUserDto(
    username: string,
    email: string,
  ): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: [{ username }, { email }],
      });
      return user ? true : false;
    } catch (error) {
      Logger.error('Error checking if user exists', error);
      throw new HttpException(
        error.message || USER_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(USER_ERROR_MESSAGES.USER_NOT_FOUND);
      }
      await this.userRepository.remove(user);
      return true;
    } catch (error) {
      Logger.error('Error deleting user', error);
      throw new HttpException(
        error.message || USER_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
