import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Nullable, Nullish } from '@Utils/types';

import { User } from './types';
import { QUERY_KEY } from '../constant';
import * as localStorage from './localstorage';

type UseUser = {
  user: Nullable<User>;
  error: Error | null;
  isLoading: boolean;
};

export function useUser(): UseUser {
  const initialData = localStorage.getUser();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.USER],
    queryFn: async (): Promise<Nullable<User>> => getUser(user),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData,
  });

  useEffect(() => {
    if (!user) localStorage.removeUser();
    else localStorage.saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
    error,
    isLoading,
  };
}

async function getUser(user: Nullish<User>): Promise<Nullable<User>> {
  if (!user) return null;
  const response = await fetch(`${process.env.API_URL}/auth/whoami`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    console.log(data);
    throw new Error('Failed to get user data.');
  }

  return data;
}
