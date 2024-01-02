import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { Post, PostStatus, Tag } from '@Store/types';
import {
  ErrorMessage,
  Nullable,
  SuccesMessage,
  ValidationError,
} from '@Utils/types';
import { extractErrorMessages } from '@Utils/functions';
import { omit } from 'ramda';

type UpdatePostBody = {
  id: string;
  token: string;
  slug: string;
  status: PostStatus;
  title: string;
  lead: string;
  content: string;
  tags: Tag[];
};

type UpdatePostError = ValidationError<{
  slug?: string;
  status?: string;
  title?: string;
  lead?: string;
  content?: string;
  tags?: string;
}>;

type UpdatePostResponse = SuccesMessage & {
  data: Post;
};

type UseUpdatePost = {
  isPending: boolean;
  updatePostMutation: UseMutateFunction<
    UpdatePostResponse,
    AxiosError<UpdatePostError | ErrorMessage>,
    UpdatePostBody,
    unknown
  >;
  error: Nullable<AxiosError<UpdatePostError | ErrorMessage>>;
};

export function useUpdatePost(): UseUpdatePost {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: updatePostMutation,
    isPending,
    error,
  } = useMutation<
    UpdatePostResponse,
    AxiosError<UpdatePostError | ErrorMessage>,
    UpdatePostBody,
    unknown
  >({
    mutationFn: (body) => updatePost(body),
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

  return { updatePostMutation, isPending, error };
}

async function updatePost(body: UpdatePostBody): Promise<UpdatePostResponse> {
  const postBody = omit(['id', 'token'], body);

  const { data } = await axios.patch<UpdatePostResponse>(
    `${process.env.API_URL}/posts/update/${body.id}`,
    postBody,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
