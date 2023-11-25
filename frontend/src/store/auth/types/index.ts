import { SuccesMessage, ValidationError } from '@Utils/types';

export type User = {
  statusCode: string;
  message: string;
  error: null;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  expirationDate: string;
};

// -------------------- Mutations ------------------- //

export type SignUpBody = {
  username: string;
  email: string;
  password: string;
};

export type SignUpError = ValidationError<{
  username?: string;
  email?: string;
  password?: string;
}>;

// ------------------------------ //

export type SignInBody = {
  email: string;
  password: string;
};

export type SignInError = ValidationError<{
  email?: string;
  password?: string;
}>;

export type AuthData = SuccesMessage & {
  user: User;
  token: string;
  expirationDate: string;
};

// ------------------------------ //

export type ActivateAccountBody = {
  token: string;
};

// ------------------------------ //

export type RecoveryBody = {
  email: string;
};

// ------------------------------ //

export type ResetPasswordBody = {
  resetToken: string;
  password: string;
};

export type ResetPasswordError = ValidationError<{
  password?: string;
}>;
