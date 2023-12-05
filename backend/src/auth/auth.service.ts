import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { Nullable, PageData } from 'src/types';
import { PostgresErrorCode } from 'src/types/enum';
import { ENV_KEYS } from 'src/types/constant';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';
import { LocalFile } from 'src/files/entity/localFile.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Asynchronously generates a hash for given password.
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  /**
   * Asynchronously compares the given raw password against the given hashed password.
   */
  async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Synchronously generates unique string using uuid v4 algorithm.
   */
  createUniqueToken(): string {
    return uuid();
  }

  /**
   * Calculate expiration date for token.
   */
  calculateTokenExpirationDate(): string {
    const now = new Date().getTime();
    const expirationTime = Number(
      this.configService.get<string>(ENV_KEYS.JWT_LIFETIME_MS),
    );
    return new Date(now + expirationTime).toISOString();
  }

  /**
   * Creates new JWT token for given user.
   */
  refreshToken(id: string): { token: string; expirationDate: string } {
    const token = this.jwtService.sign({
      userId: id,
    });

    const expirationDate = this.calculateTokenExpirationDate();

    return { token, expirationDate };
  }

  /**
   * Asynchronously searches for users
   * Throws an Error in case of failure.
   */
  async getUsers(pageNumber: number, limit: number): Promise<PageData<User>> {
    let users: Nullable<[User[], number]> = null;

    try {
      users = await this.usersService.findAndCount(pageNumber, limit);
    } catch {
      throw new InternalServerErrorException();
    }

    const hasNextPage = users[1] - pageNumber * limit - limit > 0;
    const totalPages = Math.ceil(users[1] / limit);

    return {
      data: users[0],
      limit: limit,
      pageNumber: pageNumber,
      hasNextPage: hasNextPage,
      totalPages: totalPages,
    };
  }

  /**
   * Asynchronously creates new User account.
   * Throws an Error in case of failure.
   */
  async signUp(
    username: string,
    email: string,
    hashedPassword: string,
    activationToken: string,
  ): Promise<void> {
    try {
      await this.usersService.createUser(
        username,
        email,
        hashedPassword,
        activationToken,
      );
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('Email or username already in use.');
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously check if given password and email is correct and returns user object and JSONWebToken.
   * Throws an Error in case of failure.
   */
  async signIn(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User; expirationDate: string }> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Your account is inactive.');
    }

    const isValidPassword = await this.checkPassword(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = this.jwtService.sign({
      userId: user.id,
    });

    const expirationDate = this.calculateTokenExpirationDate();

    return { token, user, expirationDate };
  }

  /**
   * Asynchronously activate user account.
   * Throws an Error in case of failure.
   */
  async activateAccount(token: string): Promise<void> {
    return this.usersService.activateAccount(token);
  }

  /**
   * Asynchronously toggle isActive property for user with given id.
   * Throws an Error in case of failure.
   */
  async toggleActiveStatus(id: string): Promise<void> {
    return this.usersService.toggleActiveStatus(id);
  }

  /**
   * Asynchronously update user email if provided data is correct.
   * Throws an Error in case of failure.
   */
  async updateEmail(
    userId: string,
    currentPassword: string,
    password: string,
    newEmail: string,
  ): Promise<User> {
    const isValidPassword = await this.checkPassword(password, currentPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    try {
      const user = await this.usersService.updateEmail(userId, newEmail);
      return user;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('Email already in use.');
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously update user password if provided data is correct.
   * Throws an Error in case of failure.
   */
  async updatePassword(
    userId: string,
    currentPassword: string,
    password: string,
    newPassword: string,
  ): Promise<User> {
    const isValidPassword = await this.checkPassword(password, currentPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const hashedPassword = await this.hashPassword(newPassword);

    return this.usersService.updatePassword(userId, hashedPassword);
  }

  /**
   * Asynchronously assign image to user.
   * Throws an Error in case of failure.
   */
  async addImage(image: LocalFile, user: User): Promise<User> {
    return this.usersService.addImage(image, user);
  }

  /**
   * Asynchronously assigns reset token to a user with given email.
   * Throws an Error in case of failure.
   */
  async setResetToken(email: string, resetToken: string): Promise<string> {
    return this.usersService.createResetToken(email, resetToken);
  }

  /**
   * Asynchronously assigns new password to a user with given reset token.
   * Throws an Error in case of failure.
   */
  async resetPassword(resetToken: string, password: string): Promise<boolean> {
    const hashedPassword = await this.hashPassword(password);

    return this.usersService.resetPassword(resetToken, hashedPassword);
  }

  /**
   * Asynchronously delete user account if provided data is correct.
   * Throws an Error in case of failure.
   */
  async deleteAccount(
    userId: string,
    currentPassword: string,
    password: string,
  ): Promise<void> {
    const isValidPassword = await this.checkPassword(password, currentPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    await this.usersService.deleteUser(userId);
  }
}
