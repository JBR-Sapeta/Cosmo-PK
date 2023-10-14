import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  /**
   * Asynchronously creates new User document in database.
   * Throws an Error in case of failure.
   * @param {string} username username.
   * @param {string} email user email.
   * @param {string} hashedPassword hashed password.
   * @param {string} activationToken unique activation token.
   * @returns {Promise<User>} promis that resolves to new User object.
   */
  async createUser(
    username: string,
    email: string,
    hashedPassword: string,
    activationToken: string,
  ): Promise<User> {
    let userData: User[];
    try {
      userData = await this.usersRepository.find({
        where: [{ email }, { username }],
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (userData.length) {
      throw new ConflictException('Email or username already in use.');
    }

    try {
      const createdUser = this.usersRepository.create({
        username,
        email,
        password: hashedPassword,
        activationToken,
      });
      const user = this.usersRepository.save(createdUser);
      return user;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
