import secureLocalStorage from 'react-secure-storage';
import { Nullable } from '@Utils/types';
import { AuthData } from '../types';
import { calculateExpirationTime } from './calculateExpirationTime';

const USER_LOCAL_STORAGE_KEY = 'COSMO_USER';

export function saveUser(authData: AuthData): void {
  secureLocalStorage.setItem(USER_LOCAL_STORAGE_KEY, authData);
}

export function getUser(): Nullable<AuthData> {
  const authData = secureLocalStorage.getItem(
    USER_LOCAL_STORAGE_KEY
  ) as Nullable<AuthData>;

  if (authData) {
    const remainingTime = calculateExpirationTime(authData);
    if (remainingTime <= 600000) {
      removeUser();
      return null;
    }
    return authData;
  }
  return null;
}

export function removeUser(): void {
  secureLocalStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
