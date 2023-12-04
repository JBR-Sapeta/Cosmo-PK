export type Opional<T> = T | undefined;
export type Nullable<T> = T | null;
export type Nullish<T> = T | undefined | null;

export type MarkAsOpional<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: Opional<T[P]>;
};
export type MarkAsNullable<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: Nullable<T[P]>;
};
export type MarkAsNullish<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: Nullish<T[P]>;
};
export type MarkAsRequired<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};
