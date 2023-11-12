export type SuccesMessage = {
  statusCode: number;
  message: string;
  error: null;
};

export type ErrorMessage = {
  statusCode: number;
  message: string | string[];
  error: string;
};

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

export type UserSignUpBody = {
  username: string;
  email: string;
  password: string;
};

export type UserSignInBody = {
  email: string;
  password: string;
};
