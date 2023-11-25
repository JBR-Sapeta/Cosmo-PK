import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import { ErrorMessage, Nullable, SuccesMessage } from '@Utils/types';
import { ActivateAccountBody } from './types';
import { extractErrorMessages } from '@Utils/functions';


type UseActivateAccount = {
  data: SuccesMessage | undefined;
  error: Nullable<AxiosError<ErrorMessage>>;
  isPending: boolean;
  activateAccountMutation: UseMutateFunction<
    SuccesMessage,
    AxiosError<ErrorMessage>,
    ActivateAccountBody,
    unknown
  >;
};

export function useActivateAccount(): UseActivateAccount {
  const { enqueueSnackbar } = useSnackbar();

  const {
    data,
    error,
    isPending,
    mutate: activateAccountMutation,
  } = useMutation<
    SuccesMessage,
    AxiosError<ErrorMessage>,
    ActivateAccountBody,
    unknown
  >({
    mutationFn: (body) => activateAccount(body),
    onError: (error) => {
      enqueueSnackbar({
        message: extractErrorMessages(error),
        variant: 'error',
      });
    },
  });

  return { data, error, isPending, activateAccountMutation };
}

async function activateAccount(
  body: ActivateAccountBody
): Promise<SuccesMessage> {
  const { data } = await axios.patch<SuccesMessage>(
    `${process.env.API_URL}/auth/activate/${body.token}`
  );

  return data;
}
