import { useNavigate } from 'react-router-dom';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { ErrorMessage, Nullable, SuccesMessage } from '@Utils/types';
import { ROUTER_PATH } from '@Router/constant';

import { ResetPasswordBody, ResetPasswordError } from './types';

type UseResetPassword = {
  data: SuccesMessage | undefined;
  error: Nullable<AxiosError<ResetPasswordError | ErrorMessage>>;
  isPending: boolean;
  resetPasswordMutation: UseMutateFunction<
    SuccesMessage,
    AxiosError<ResetPasswordError | ErrorMessage>,
    ResetPasswordBody,
    unknown
  >;
};

export function useResetPassword(): UseResetPassword {
  const navigate = useNavigate();

  const {
    data,
    error,
    isPending,
    mutate: resetPasswordMutation,
  } = useMutation<
    SuccesMessage,
    AxiosError<ResetPasswordError | ErrorMessage>,
    ResetPasswordBody,
    unknown
  >({
    mutationFn: (body) => resetPassword(body),
    onSuccess: () => {
      navigate(ROUTER_PATH.SIGN_IN);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { data, error, isPending, resetPasswordMutation };
}

async function resetPassword(body: ResetPasswordBody): Promise<SuccesMessage> {
  const { data } = await axios.patch<SuccesMessage>(
    `${process.env.API_URL}/auth/recovery`,
    body
  );

  return data;
}
