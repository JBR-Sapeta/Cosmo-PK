import { useNavigate } from 'react-router-dom';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SuccesMessage, ErrorMessage, Nullable } from '@Utils/types';
import { ROUTER_PATH } from '@Router/constant';
import { SignUpBody, SignUpError } from './types';

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
    mutationFn: (data) => signUp(data),
    onSuccess: () => {
      navigate(ROUTER_PATH.SIGN_IN);
    },
    onError: (error) => {
      console.log(error);
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
