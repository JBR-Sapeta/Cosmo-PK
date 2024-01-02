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

type CreatePostBody = {
  slug: string;
  status: PostStatus;
  title: string;
  lead: string;
  content: string;
  tags: Tag[];
  token: string;
};

type CreatePostError = ValidationError<{
  slug: string;
  status: PostStatus;
  title: string;
  lead: string;
  content: string;
  tags: string;
}>;

type CreatePostResponse = SuccesMessage & {
  data: Post;
};

type UseCreatePost = {
  isPending: boolean;
  signUpMutation: UseMutateFunction<
    CreatePostResponse,
    AxiosError<CreatePostError | ErrorMessage>,
    CreatePostBody,
    unknown
  >;
  error: Nullable<AxiosError<CreatePostError | ErrorMessage>>;
};

export function useCreatePost(): UseCreatePost {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: signUpMutation,
    isPending,
    error,
  } = useMutation<
    CreatePostResponse,
    AxiosError<CreatePostError | ErrorMessage>,
    CreatePostBody,
    unknown
  >({
    mutationFn: (body) => signUp(body),
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

  return { signUpMutation, isPending, error };
}

async function signUp(body: CreatePostBody): Promise<CreatePostResponse> {
  const postBody = omit(['token'], body);

  const { data } = await axios.post<CreatePostResponse>(
    `${process.env.API_URL}/posts/create`,
    postBody,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
