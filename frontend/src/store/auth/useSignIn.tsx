import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import { ErrorMessage, Nullable } from '@Utils/types';
import { extractErrorMessages } from '@Utils/functions';
import { ROUTER_PATH } from '@Router/constant';

import * as userDataStorage from './utils/userDataStorage';
import { QUERY_KEY } from '../constant';
import { AuthData, SignInBody, SignInError } from './types';

type UseSignIn = {
  isPending: boolean;
  signInMutation: UseMutateFunction<
    AuthData,
    AxiosError<ErrorMessage>,
    SignInBody,
    unknown
  >;
  error: Nullable<AxiosError<SignInError | ErrorMessage>>;
};

export function useSignIn(): UseSignIn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: signInMutation,
    isPending,
    error,
  } = useMutation<AuthData, AxiosError<ErrorMessage>, SignInBody, unknown>({
    mutationFn: (body) => signIn(body),
    onSuccess: (data) => {
      userDataStorage.saveUser(data);
      queryClient.setQueryData([QUERY_KEY.USER], data);
      navigate(ROUTER_PATH.NEWS);
    },
    onError: (error) => {
      enqueueSnackbar({
        message: extractErrorMessages(error),
        variant: 'error',
      });
    },
  });

  return { signInMutation, isPending, error };
}

async function signIn(body: SignInBody): Promise<AuthData> {
  const { data } = await axios.post<AuthData>(
    `${process.env.API_URL}/auth/signin`,
    body
  );

  return data;
}
