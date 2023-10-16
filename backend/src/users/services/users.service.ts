import {
  BadRequestException,
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
    const newUser = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
      activationToken,
    });

    return this.usersRepository.save(newUser);
  }

  /**
   * Asynchronously searches for a user with given ID in database.
   * Throws an Error in case of failure.
   * @param {string} userId user ID.
   * @returns {Promise<User | null>} promis that resolves to User object or null.
   */
  async getUserById(userId: string): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOneBy({ id: userId });
      return user;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously searches for a user with given email in database.
   * Throws an Error in case of failure.
   * @param {string} email user email.
   * @returns {Promise<User | null>} promis that resolves to User entity or null.
   */
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      return user;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously changes isActive property to true in database for user with given activation token.
   * It sets activationToken to null.
   * Throws an Error in case of failure.
   * @param {string} activationToken unique activation token string.
   * @returns {Promise<void>} promis.
   */
  async activateAccount(activationToken: string): Promise<void> {
    let user: User | null = null;

    try {
      user = await this.usersRepository.findOneBy({ activationToken });
    } catch {
      throw new InternalServerErrorException();
    }

    if (!user) {
      throw new BadRequestException(
        'This account is either active or provided token is invalid.',
      );
    }

    try {
      user.activationToken = null;
      user.isActive = true;
      await this.usersRepository.save(user);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously updates email in database for user with given ID.
   * Throws an Error in case of failure.
   * @param {string} userId id of user to update.
   * @param {string} email new email value.
   * @returns {Promise<User>}promis that resolves to updated User entity.
   */
  async updateEmail(userId: string, email: string): Promise<User> {
    return this.usersRepository.save({ id: userId, email });
  }

  /**
   * Asynchronously updates password in database for user with given ID.
   * Throws an Error in case of failure.
   * @param {string} userId id of user to update.
   * @param {string} password new hashed password.
   * @returns {Promise<User>} promis that resolves to updated User entity.
   */
  async updatePassword(userId: string, password: string): Promise<User> {
    try {
      const user = await this.usersRepository.save({ id: userId, password });
      return user;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
