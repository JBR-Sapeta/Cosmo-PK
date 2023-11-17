import { useQuery } from '@tanstack/react-query';
import { Nullable } from '@Utils/types';
import { QUERY_KEY } from '../constant';
import { AuthData } from './types';
import * as userDataStorage from './userDataStorage';
import { getUser } from './useAuth';

type UseUser = {
  user: Nullable<AuthData>;
};

export function useUser(): UseUser {
  const storedUser = userDataStorage.getUser();

  const { data: user } = useQuery({
    queryKey: [QUERY_KEY.USER],
    queryFn: async (): Promise<Nullable<AuthData>> => getUser(storedUser),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return {
    user: user ?? null,
  };
}
