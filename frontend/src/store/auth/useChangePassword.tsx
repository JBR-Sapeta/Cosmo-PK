import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import {
  ErrorMessage,
  Nullable,
  SuccesMessage,
  ValidationError,
} from '@Utils/types';
import { extractErrorMessages } from '@Utils/functions';
import { QUERY_KEY } from '@Store/constant';

type ChangePasswordBody = {
  token: string;
  newPassword: string;
  password: string;
};

type ChangePasswordError = ValidationError<{
  newPassword?: string;
}>;

type UseChangePassword = {
  isPending: boolean;
  changePasswordMutation: UseMutateFunction<
    SuccesMessage,
    AxiosError<ChangePasswordError | ErrorMessage>,
    ChangePasswordBody,
    unknown
  >;
  error: Nullable<AxiosError<ChangePasswordError | ErrorMessage>>;
};

export function useChangePassword(): UseChangePassword {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: changePasswordMutation,
    isPending,
    error,
  } = useMutation<
    SuccesMessage,
    AxiosError<ChangePasswordError | ErrorMessage>,
    ChangePasswordBody,
    unknown
  >({
    mutationFn: (body) => changePassword(body),
    onSuccess: (data) => {
      enqueueSnackbar({
        message: data.message,
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER] });
    },
    onError: (error) => {
      enqueueSnackbar({
        message: extractErrorMessages(error),
        variant: 'error',
      });
    },
  });

  return { changePasswordMutation, isPending, error };
}

async function changePassword(
  body: ChangePasswordBody
): Promise<SuccesMessage> {
  const { data } = await axios.patch<SuccesMessage>(
    `${process.env.API_URL}/auth/password`,
    body,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
