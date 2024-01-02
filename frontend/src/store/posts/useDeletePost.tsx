import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { Post } from '@Store/types';
import { ErrorMessage, Nullable, SuccesMessage } from '@Utils/types';
import { extractErrorMessages } from '@Utils/functions';

type DeletePostBody = {
  id: string;
  token: string;
};

type DeletePostResponse = SuccesMessage & {
  data: Post;
};

type UseDeletePost = {
  isPending: boolean;
  deletePostMutation: UseMutateFunction<
    DeletePostResponse,
    AxiosError<ErrorMessage>,
    DeletePostBody,
    unknown
  >;
  error: Nullable<AxiosError<ErrorMessage>>;
};

export function useDeletePost(): UseDeletePost {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: deletePostMutation,
    isPending,
    error,
  } = useMutation<
    DeletePostResponse,
    AxiosError<ErrorMessage>,
    DeletePostBody,
    unknown
  >({
    mutationFn: (body) => deletePost(body),
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

  return { deletePostMutation, isPending, error };
}

async function deletePost(body: DeletePostBody): Promise<DeletePostResponse> {
  const { data } = await axios.patch<DeletePostResponse>(
    `${process.env.API_URL}/posts/delete/${body.id}`,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
