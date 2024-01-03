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

import { QUERY_KEY } from '../constant';

type ChangeEmailBody = {
  token: string;
  newEmail: string;
  password: string;
};

type ChangeEmailError = ValidationError<{
  newEmail?: string;
}>;

type UseChangeEmail = {
  isPending: boolean;
  changeEmailMutation: UseMutateFunction<
    SuccesMessage,
    AxiosError<ChangeEmailError | ErrorMessage>,
    ChangeEmailBody,
    unknown
  >;
  error: Nullable<AxiosError<ChangeEmailError | ErrorMessage>>;
};

export function useChangeEmail(): UseChangeEmail {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: changeEmailMutation,
    isPending,
    error,
  } = useMutation<
    SuccesMessage,
    AxiosError<ChangeEmailError | ErrorMessage>,
    ChangeEmailBody,
    unknown
  >({
    mutationFn: (body) => changeEmail(body),
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

  return { changeEmailMutation, isPending, error };
}

async function changeEmail(body: ChangeEmailBody): Promise<SuccesMessage> {
  const { data } = await axios.patch<SuccesMessage>(
    `${process.env.API_URL}/auth/email`,
    body,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
