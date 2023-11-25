import { useNavigate } from 'react-router-dom';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { SuccesMessage, ErrorMessage, Nullable } from '@Utils/types';
import { ROUTER_PATH } from '@Router/constant';
import { SignUpBody, SignUpError } from './types';
import { extractErrorMessages } from '@Utils/functions';

type UseSignUp = {
  isPending: boolean;
  signUpMutation: UseMutateFunction<
    SuccesMessage,
    AxiosError<SignUpError | ErrorMessage>,
    SignUpBody,
    unknown
  >;
  error: Nullable<AxiosError<SignUpError | ErrorMessage>>;
};

export function useSignUp(): UseSignUp {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: signUpMutation,
    isPending,
    error,
  } = useMutation<
    SuccesMessage,
    AxiosError<SignUpError | ErrorMessage>,
    SignUpBody,
    unknown
  >({
    mutationFn: (body) => signUp(body),
    onSuccess: () => {
      navigate(ROUTER_PATH.SIGN_IN);
    },
    onError: (error) => {
      enqueueSnackbar({
        message: extractErrorMessages(error),
        variant: 'error',
      });
    },
  });

  return { signUpMutation, isPending, error };
}

async function signUp(body: SignUpBody): Promise<SuccesMessage> {
  const { data } = await axios.post<SuccesMessage>(
    `${process.env.API_URL}/auth/signup`,
    body
  );

  return data;
}
