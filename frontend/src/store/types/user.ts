import { Nullable, SuccesMessage } from '@Utils/types';

import { ImageData } from './image';

export enum Role {
  USER = 'User',
  ADMIN = 'Admin',
}

export type User = {
  id: string;
  username: string;
  email: string;
  roles: Role[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  imageId: Nullable<string>;
  image: Nullable<ImageData>;
};

export type AuthData = SuccesMessage & {
  user: User;
  token: string;
  expirationDate: string;
};

export type UserPreview = {
  username: string;
  image: Nullable<ImageData>;
};
