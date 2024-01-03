import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@Store/constant';
import { ErrorMessage, Nullable, SuccesMessage } from '@Utils/types';
import { extractErrorMessages } from '@Utils/functions';


type ToggleIsActiveBody = {
  id: string;
  token: string;
};

type UseUploadPost = {
  isPending: boolean;
  uploadPostImageMutation: UseMutateFunction<
    SuccesMessage,
    AxiosError<ErrorMessage>,
    ToggleIsActiveBody,
    unknown
  >;
  error: Nullable<AxiosError<ErrorMessage>>;
};

export function useUploadPostImage(): UseUploadPost {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: uploadPostImageMutation,
    isPending,
    error,
  } = useMutation<
    SuccesMessage,
    AxiosError<ErrorMessage>,
    ToggleIsActiveBody,
    unknown
  >({
    mutationFn: (body) => uploadPostImage(body),
    onSuccess: (data) => {
      enqueueSnackbar({
        message: data.message,
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] });
    },
    onError: (error) => {
      enqueueSnackbar({
        message: extractErrorMessages(error),
        variant: 'error',
      });
    },
  });

  return { uploadPostImageMutation, isPending, error };
}

async function uploadPostImage(
  body: ToggleIsActiveBody
): Promise<SuccesMessage> {
  const { data } = await axios.patch<SuccesMessage>(
    `${process.env.API_URL}/auth/isactive/${body.id}`,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
