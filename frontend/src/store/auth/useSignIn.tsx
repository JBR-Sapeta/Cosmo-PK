import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '@Router/constant';
import { QUERY_KEY } from '../constant';
import { AuthData, SignInBody } from './types';
import * as userDataStorage from './userDataStorage';
import axios, { AxiosError } from 'axios';
import { ErrorMessage } from '@Utils/types';

type UseSignIn = {
  isPending: boolean;
  signInMutation: UseMutateFunction<
    AuthData,
    AxiosError<ErrorMessage>,
    SignInBody,
    unknown
  >;
};

export function useSignIn(): UseSignIn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signInMutation, isPending } = useMutation<
    AuthData,
    AxiosError<ErrorMessage>,
    SignInBody,
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

async function signIn(body: SignInBody): Promise<AuthData> {
  const { data } = await axios.post<AuthData>(
    `${process.env.API_URL}/auth/signin`,
    body
  );

  return data;
}
