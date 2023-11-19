export type SuccesMessage = {
  statusCode: number;
  message: string;
  error: null;
};

export type ErrorMessage = {
  statusCode: number;
  message: string;
  error: string;
};

export type ValidationError<T> = {
  statusCode: number;
  message: T;
  error: string;
};
