import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
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
}
