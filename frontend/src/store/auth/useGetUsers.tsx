import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Nullable } from '@Utils/types';

import { User } from '../types';
import { QUERY_KEY } from '../constant';

type UsersData = {
  data: User[];
  limit: number;
  pageNumber: number;
  hasNextPage: boolean;
  totalPages: number;
};

type UseGetUsers = {
  tagData: Nullable<UsersData>;
  error: Error | null;
  isLoading: boolean;
};

export function useGetUsers(pageNumber: number, token: string): UseGetUsers {
  const {
    data: tagData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.USERS],
    queryFn: async (): Promise<UsersData> => getUsers(pageNumber, token),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialData: null,
  });

  return {
    tagData,
    error,
    isLoading,
  };
}

export async function getUsers(
  pageNumber: number,
  token: string
): Promise<UsersData> {
  const { data } = await axios.get<UsersData>(
    `${process.env.API_URL}/auth?pageNumber=${pageNumber}&limit=12`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
