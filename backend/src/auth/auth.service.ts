import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { PostgresErrorCode } from 'src/types';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Asynchronously generates a hash for given password.
   * @param {string} password raw password.
   * @returns {Promise<string>} promis that resolves to hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  /**
   * Asynchronously compares the given raw password against the given hashed password.
   * @param {string} password raw password.
   * @param {string} hashedPassword hashed password.
   * @returns {Promise<boolean>} promis that resolves to true if password is correct, otherwise false.
   */
  async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Synchronously generates unique string using uuid v4 algorithm.
   * @returns {Promise<boolean>} unique string.
   */
  createUniqueToken(): string {
    return uuid();
  }

  /**
   * Asynchronously creates new User account.
   * Throws an Error in case of failure.
   * @param {string} username username.
   * @param {string} email user email.
   * @param {string} hashedPassword hashed password.
   * @param {string} activationToken unique activation token.
   * @returns {Promise<void>} promis.
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
   * @param {string} email user email.
   * @param {string} password  password.
   * @returns { Promise<{ token: string, user: User }>} promis that resolves to user object and JSONWebToken.
   */
  async signIn(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
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

    return { token, user };
  }

  /**
   * Asynchronously activate user account.
   * Throws an Error in case of failure.
   * @param {string} token unique activation token string.
   * @returns {Promise<void>} void.
   */
  async activateAccount(token: string): Promise<void> {
    return this.usersService.activateAccount(token);
  }

  /**
   * Asynchronously update user email if provided data is correct.
   * Throws an Error in case of failure.
   * @param {string} userId  user ID.
   * @param {string} currentPassword hashed password.
   * @param {string} password provided password.
   * @param {string} newEmail new email address.
   * @returns { Promise<User>} promis that resolves to user object.
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
      return await this.usersService.updateEmail(userId, newEmail);
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
   * @param {string} userId  user ID.
   * @param {string} currentPassword hashed password.
   * @param {string} password provided password.
   * @param {string} newPassword new password.
   * @returns { Promise<User>} promis that resolves to user object.
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
   * Asynchronously assigns reset token to a user with given email.
   * Throws an Error in case of failure.
   * @param {string} email user email.
   * @param {string} resetToken unique reste token.
   * @returns {Promise<string>} promis that resolves to username.
   */
  async setResetToken(email: string, resetToken: string): Promise<string> {
    return this.usersService.createResetToken(email, resetToken);
  }

  /**
   * Asynchronously assigns new password to a user with given reset token.
   * Throws an Error in case of failure.
   * @param {string} resetToken unique reset token.
   * @param {string} password new password.
   * @returns {Promise<boolean>} promis .
   */
  async resetPassword(resetToken: string, password: string): Promise<void> {
    const hashedPassword = await this.hashPassword(password);

    await this.usersService.resetPassword(resetToken, hashedPassword);
  }

  /**
   * Asynchronously delete user account if provided data is correct.
   * Throws an Error in case of failure.
   * @param {string} userId  user ID.
   * @param {string} currentPassword hashed password.
   * @param {string} password provided password.
   * @returns { Promise<void>} promis.
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
