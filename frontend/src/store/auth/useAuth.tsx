import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Nullable, Nullish } from '@Utils/types';

import { calculateExpirationTime } from './utils';
import { AuthData } from './types';
import { QUERY_KEY } from '../constant';
import * as userDataStorage from './userDataStorage';
import { ROUTER_PATH } from '@Router/constant';

type UseAuth = {
  user: Nullable<AuthData>;
  error: Error | null;
  isLoading: boolean;
};

export function useAuth(): UseAuth {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.USER],
    queryFn: async (): Promise<Nullable<AuthData>> => getUser(user),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    placeholderData: userDataStorage.getUser(),
  });

  useEffect(() => {
    if (user) {
      userDataStorage.saveUser(user);
      const expiresIn = calculateExpirationTime(user);
      const timeout = setTimeout(() => {
        queryClient.setQueryData([QUERY_KEY.USER], null);
        navigate(ROUTER_PATH.SIGN_IN);
      }, expiresIn);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [user, navigate, queryClient]);

  return {
    user: user ?? null,
    error,
    isLoading,
  };
}

export async function getUser(
  user: Nullish<AuthData>
): Promise<Nullable<AuthData>> {
  console.log('getUser - Runs');
  if (!user) return null;
  const response = await fetch(`${process.env.API_URL}/auth/whoami`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const data = await response.json();
  console.log('getUser - data: ', data);
  if (!response.ok) {
    console.log(data);
    throw new Error('Failed to get user data.');
  }

  return data;
}
