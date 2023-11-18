import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ROUTER_PATH } from '@Router/constant';
import { QUERY_KEY } from '../constant';
import * as userDataStorage from './utils/userDataStorage';

type UseSignOut = {
  signOutMutation: VoidFunction;
};

export function useSignOut(): UseSignOut {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signOutMutation = useCallback(() => {
    userDataStorage.removeUser();
    queryClient.setQueryData([QUERY_KEY.USER], null);
    navigate(ROUTER_PATH.SIGN_IN);
  }, [navigate, queryClient]);

  return { signOutMutation };
}
