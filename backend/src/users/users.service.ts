import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';
import { Nullable } from 'src/types';
import { ENV_KEYS } from 'src/types/constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Asynchronously creates new User record in database.
   * Throws an Error in case of failure.
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
   */
  async getUserById(userId: string): Promise<Nullable<User>> {
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
   */
  async getUserByEmail(email: string): Promise<Nullable<User>> {
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
   */
  async activateAccount(activationToken: string): Promise<void> {
    let user: Nullable<User> = null;

    try {
      user = await this.usersRepository.findOneBy({ activationToken });
    } catch {
      throw new InternalServerErrorException();
    }

    if (!user) {
      throw new ForbiddenException(
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
   */
  async updateEmail(userId: string, email: string): Promise<User> {
    return this.usersRepository.save({ id: userId, email });
  }

  /**
   * Asynchronously updates password in database for user with given ID.
   * Throws an Error in case of failure.
   */
  async updatePassword(userId: string, password: string): Promise<User> {
    try {
      const user = await this.usersRepository.save({ id: userId, password });
      return user;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously create reset token for a user with given email in database.
   * Throws an Error in case of failure.
   */
  async createResetToken(email: string, resetToken: string): Promise<string> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    try {
      user.resetToken = resetToken;
      user.resetTokenExpirationDate = new Date(
        new Date().getTime() +
          Number(
            this.configService.get<string>(ENV_KEYS.RESET_TOKEN_LIFETIME_MS),
          ),
      );
      await this.usersRepository.save(user);
    } catch {
      throw new InternalServerErrorException();
    }

    return user.username;
  }

  /**
   * Asynchronously changes password for a user with given reset token in database.
   * Changes isActive property to true and sets resetToken to null.
   * Throws an Error in case of failure.
   */
  async resetPassword(
    resetToken: string,
    hashedPassword: string,
  ): Promise<boolean> {
    let user: Nullable<User> = null;

    try {
      user = await this.usersRepository.findOneBy({ resetToken });
    } catch {
      throw new InternalServerErrorException();
    }

    if (!user) {
      throw new ForbiddenException('Your token is invalid or has expired.');
    }

    const now = new Date().getTime();
    const expiresIn = new Date(user.resetTokenExpirationDate).getTime();

    if (expiresIn - now < 0) {
      throw new ForbiddenException('Your token is invalid or has expired.');
    }

    try {
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpirationDate = null;
      user.activationToken = null;
      user.isActive = true;
      await this.usersRepository.save(user);
    } catch {
      throw new InternalServerErrorException();
    }

    return true;
  }

  /**
   * Asynchronously removes a user with given id from database.
   * Throws an Error in case of failure.
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      await this.usersRepository.delete({ id: userId });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
