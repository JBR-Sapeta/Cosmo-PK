/* eslint-disable @typescript-eslint/no-explicit-any */

export type Nullable<T> = T | null;
export type Nullish<T> = T | null | undefined;

export type MarkAsNullable<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: Nullable<T[P]>;
};
export type MarkAsNullish<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: Nullish<T[P]>;
};
export type MarkAsRequired<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

export type VoidFunction = (...args: any) => void;
