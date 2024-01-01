import { useNavigate } from 'react-router-dom';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import { extractErrorMessages } from '@Utils/functions';
import {
  ErrorMessage,
  Nullable,
  SuccesMessage,
  ValidationError,
} from '@Utils/types';
import { ROUTER_PATH } from '@Router/constant';

type ResetPasswordBody = {
  resetToken: string;
  password: string;
};

type ResetPasswordError = ValidationError<{
  password?: string;
}>;

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
  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar({
        message: extractErrorMessages(error),
        variant: 'error',
      });
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
