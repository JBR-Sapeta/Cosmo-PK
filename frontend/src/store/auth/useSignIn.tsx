import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '@Router/constant';
import { QUERY_KEY } from '../constant';
import { User, UserSignInBody } from './types';
import * as userDataStorage from './userDataStorage';

type UseSignIn = {
  isPending: boolean;
  signInMutation: UseMutateFunction<User, unknown, UserSignInBody, unknown>;
};

export function useSignIn(): UseSignIn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signInMutation, isPending } = useMutation<
    User,
    unknown,
    UserSignInBody,
    unknown
  >({
    mutationFn: (data) => signIn(data),
    onSuccess: (data) => {
      userDataStorage.saveUser(data);
      queryClient.setQueryData([QUERY_KEY.USER], data);
      navigate(ROUTER_PATH.NEWS);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { signInMutation, isPending };
}

async function signIn(body: UserSignInBody): Promise<User> {
  const response = await fetch(`${process.env.API_URL}/auth/signin`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (!response.ok) {
    console.log(data);
    throw new Error('Failed to sign in.');
  }

  return data;
}
