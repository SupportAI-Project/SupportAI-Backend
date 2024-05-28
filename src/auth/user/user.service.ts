import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ERROR_MESSAGES, SALT_ROUNDS } from 'src/constants/constants';

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
        console.log('error creating user');
        throw new InternalServerErrorException(ERROR_MESSAGES.CREATE_USER);
      }
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log('error creating user: ', error);
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
      console.log('error getting user by username or email: ', error);
    }
  }
  async verifyUser(email: string, password: string) {
    const user = await this.getUser(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return user;
  }
}
