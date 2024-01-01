import { SuccesMessage } from '@Utils/types';

export type User = {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthData = SuccesMessage & {
  user: User;
  token: string;
  expirationDate: string;
};
