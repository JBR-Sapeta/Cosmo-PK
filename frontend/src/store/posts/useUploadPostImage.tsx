import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { ImageBody, Post, PostStatus } from '@Store/types';
import {
  ErrorMessage,
  Nullable,
  SuccesMessage,
  ValidationError,
} from '@Utils/types';
import { extractErrorMessages } from '@Utils/functions';

type UploadPostImageBody = {
  id: string;
  token: string;
  image: ImageBody;
};

type UploadPostImageError = ValidationError<{
  file?: string;
  alt?: PostStatus;
}>;

type UploadPostImageResponse = SuccesMessage & {
  data: Post;
};

type UseUploadPost = {
  isPending: boolean;
  uploadPostImageMutation: UseMutateFunction<
    UploadPostImageResponse,
    AxiosError<UploadPostImageError | ErrorMessage>,
    UploadPostImageBody,
    unknown
  >;
  error: Nullable<AxiosError<UploadPostImageError | ErrorMessage>>;
};

export function useUploadPostImage(): UseUploadPost {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: uploadPostImageMutation,
    isPending,
    error,
  } = useMutation<
    UploadPostImageResponse,
    AxiosError<UploadPostImageError | ErrorMessage>,
    UploadPostImageBody,
    unknown
  >({
    mutationFn: (body) => uploadPostImage(body),
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

  return { uploadPostImageMutation, isPending, error };
}

async function uploadPostImage(
  body: UploadPostImageBody
): Promise<UploadPostImageResponse> {
  const { data } = await axios.patch<UploadPostImageResponse>(
    `${process.env.API_URL}/posts/upload/${body.id}`,
    body.image,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
