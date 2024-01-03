import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import {
  ErrorMessage,
  Nullable,
  SuccesMessage,
  ValidationError,
} from '@Utils/types';
import { extractErrorMessages } from '@Utils/functions';

type UploadAvatarBody = {
  token: string;
  image: { file: File };
};

type UploadAvatarError = ValidationError<{
  file?: string;
}>;

type UseUploadPost = {
  isPending: boolean;
  uploadAvatarMutation: UseMutateFunction<
    SuccesMessage,
    AxiosError<UploadAvatarError | ErrorMessage>,
    UploadAvatarBody,
    unknown
  >;
  error: Nullable<AxiosError<UploadAvatarError | ErrorMessage>>;
};

export function useUploadAvatar(): UseUploadPost {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: uploadAvatarMutation,
    isPending,
    error,
  } = useMutation<
    SuccesMessage,
    AxiosError<UploadAvatarError | ErrorMessage>,
    UploadAvatarBody,
    unknown
  >({
    mutationFn: (body) => uploadAvatar(body),
    onSuccess: (data) => {
      enqueueSnackbar({
        message: data.message,
        variant: 'success',
      });
    },
    onError: (error) => {
      enqueueSnackbar({
        message: extractErrorMessages(error),
        variant: 'error',
      });
    },
  });

  return { uploadAvatarMutation, isPending, error };
}

async function uploadAvatar(body: UploadAvatarBody): Promise<SuccesMessage> {
  const { data } = await axios.patch<SuccesMessage>(
    `${process.env.API_URL}/auth/avatar`,
    body.image,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
