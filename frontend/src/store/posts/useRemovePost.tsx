import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { Post } from '@Store/types';
import { ErrorMessage, Nullable, SuccesMessage } from '@Utils/types';
import { extractErrorMessages } from '@Utils/functions';

type RemovePostBody = {
  id: string;
  token: string;
};

type RemovePostResponse = SuccesMessage & {
  data: Post;
};

type UseRemovePost = {
  isPending: boolean;
  removePostMutation: UseMutateFunction<
    RemovePostResponse,
    AxiosError<ErrorMessage>,
    RemovePostBody,
    unknown
  >;
  error: Nullable<AxiosError<ErrorMessage>>;
};

export function useRemovePost(): UseRemovePost {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: removePostMutation,
    isPending,
    error,
  } = useMutation<
    RemovePostResponse,
    AxiosError<ErrorMessage>,
    RemovePostBody,
    unknown
  >({
    mutationFn: (body) => removePost(body),
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

  return { removePostMutation, isPending, error };
}

async function removePost(body: RemovePostBody): Promise<RemovePostResponse> {
  const { data } = await axios.delete<RemovePostResponse>(
    `${process.env.API_URL}/posts/remove/${body.id}`,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
