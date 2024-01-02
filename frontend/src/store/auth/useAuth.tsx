import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Nullable, Nullish } from '@Utils/types';
import { ROUTER_PATH } from '@Router/constant';

import { calculateExpirationTime } from './utils/calculateExpirationTime';

import { AuthData } from '../types';
import { QUERY_KEY } from '../constant';
import * as userDataStorage from './utils/userDataStorage';

type UseAuth = {
  authData: Nullable<AuthData>;
  error: Error | null;
  isLoading: boolean;
};

export function useAuth(): UseAuth {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: authData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.USER],
    queryFn: async (): Promise<Nullable<AuthData>> => getUser(authData),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    placeholderData: userDataStorage.getUser(),
  });

  useEffect(() => {
    if (authData) {
      userDataStorage.saveUser(authData);
      const expiresIn = calculateExpirationTime(authData);
      const timeout = setTimeout(() => {
        queryClient.setQueryData([QUERY_KEY.USER], null);
        navigate(ROUTER_PATH.SIGN_IN);
      }, expiresIn);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [authData, navigate, queryClient]);

  return {
    authData: authData ?? null,
    error,
    isLoading,
  };
}

export async function getUser(
  authData: Nullish<AuthData>
): Promise<Nullable<AuthData>> {
  if (!authData) return null;
  const { data } = await axios.get<AuthData>(
    `${process.env.API_URL}/auth/whoami`,
    {
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    }
  );

  return data;
}
