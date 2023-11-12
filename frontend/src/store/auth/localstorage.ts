import secureLocalStorage from 'react-secure-storage';
import { Nullable } from '@Utils/types';
import { User } from './types';
import { calculateExpirationTime } from './utils';

const USER_LOCAL_STORAGE_KEY = 'COSMO_USER';

export function saveUser(user: User): void {
  secureLocalStorage.setItem(USER_LOCAL_STORAGE_KEY, user);
}

export function getUser(): Nullable<User> {
  const user = secureLocalStorage.getItem(
    USER_LOCAL_STORAGE_KEY
  ) as Nullable<User>;

  if (user) {
    const remainingTime = calculateExpirationTime(user);
    if (remainingTime <= 600000) {
      removeUser();
      return null;
    }
    return user;
  }
  return null;
}

export function removeUser(): void {
  secureLocalStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}

