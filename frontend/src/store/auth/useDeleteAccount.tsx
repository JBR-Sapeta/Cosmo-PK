import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  ErrorMessage,
  Nullable,
  SuccesMessage,
  ValidationError,
} from '@Utils/types';
import { extractErrorMessages } from '@Utils/functions';
import { QUERY_KEY } from '@Store/constant';
import { ROUTER_PATH } from '@Router/constant';

type DeleteAccountBody = {
  token: string;
  password: string;
};

type DeleteAccountError = ValidationError<{
  password?: string;
}>;

type UseDeleteAccount = {
  isPending: boolean;
  changePasswordMutation: UseMutateFunction<
    SuccesMessage,
    AxiosError<DeleteAccountError | ErrorMessage>,
    DeleteAccountBody,
    unknown
  >;
  error: Nullable<AxiosError<DeleteAccountError | ErrorMessage>>;
};

export function useDeleteAccount(): UseDeleteAccount {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    mutate: changePasswordMutation,
    isPending,
    error,
  } = useMutation<
    SuccesMessage,
    AxiosError<DeleteAccountError | ErrorMessage>,
    DeleteAccountBody,
    unknown
  >({
    mutationFn: (body) => changePassword(body),
    onSuccess: (data) => {
      enqueueSnackbar({
        message: data.message,
        variant: 'success',
      });
      queryClient.setQueryData([QUERY_KEY.USER], null);
      navigate(ROUTER_PATH.SIGN_IN);
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

async function changePassword(body: DeleteAccountBody): Promise<SuccesMessage> {
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
