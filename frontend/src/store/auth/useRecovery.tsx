import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import { extractErrorMessages } from '@Utils/functions';
import { ErrorMessage, Nullable, SuccesMessage } from '@Utils/types';

type RecoveryBody = {
  email: string;
};

type UseRecovery = {
  data: SuccesMessage | undefined;
  error: Nullable<AxiosError<ErrorMessage>>;
  isPending: boolean;
  recoveryMutation: UseMutateFunction<
    SuccesMessage,
    AxiosError<ErrorMessage>,
    RecoveryBody,
    unknown
  >;
};

export function useRecovery(): UseRecovery {
  const { enqueueSnackbar } = useSnackbar();

  const {
    data,
    error,
    isPending,
    mutate: recoveryMutation,
  } = useMutation<
    SuccesMessage,
    AxiosError<ErrorMessage>,
    RecoveryBody,
    unknown
  >({
    mutationFn: (body) => recovery(body),
    onError: (error) => {
      enqueueSnackbar({
        message: extractErrorMessages(error),
        variant: 'error',
      });
    },
  });

  return { data, error, isPending, recoveryMutation };
}

async function recovery(body: RecoveryBody): Promise<SuccesMessage> {
  const { data } = await axios.post<SuccesMessage>(
    `${process.env.API_URL}/auth/recovery`,
    body
  );

  return data;
}
