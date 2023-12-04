export type PageData<T> = {
  data: T[];
  limit: number;
  pageNumber: number;
  hasNextPage: boolean;
  totalPages: number;
};
