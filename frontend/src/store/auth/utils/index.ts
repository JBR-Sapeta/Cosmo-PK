import { User } from '../types';

export function calculateExpirationTime(user: User): number {
  const now = new Date().getTime();
  const expirationDate = new Date(user.expirationDate).getTime();
  return expirationDate - now;
}
