import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { ErrorMessage, SuccesMessage } from '@Utils/types';
import { ActivateAccountBody } from './types';

type UseActivateAccount = {
  data: SuccesMessage | undefined;
  error: AxiosError<ErrorMessage> | null;
  isPending: boolean;
  activateAccountMutation: UseMutateFunction<
    SuccesMessage,
    AxiosError<ErrorMessage>,
    ActivateAccountBody,
    unknown
  >;
};

export function useActivateAccount(): UseActivateAccount {
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
      console.log(error);
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
