import { useQuery } from '@tanstack/react-query';

import { Nullable } from '@Utils/types';

import { AuthData } from '../types';
import { QUERY_KEY } from '../constant';

import * as userDataStorage from './utils/userDataStorage';
import { getUser } from './useAuth';


type UseUser = {
  authData: Nullable<AuthData>;
};

export function useUser(): UseUser {
  const storedUser = userDataStorage.getUser();

  const { data: authData } = useQuery({
    queryKey: [QUERY_KEY.USER],
    queryFn: async (): Promise<Nullable<AuthData>> => getUser(storedUser),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return {
    authData: authData ?? null,
  };
}
