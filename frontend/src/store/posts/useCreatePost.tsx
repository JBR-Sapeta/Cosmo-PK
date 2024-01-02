import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { ImageBody, Post, PostStatus, Tag } from '@Store/types';
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
  image: ImageBody;
  token: string;
};

type CreatePostError = ValidationError<{
  slug?: string;
  status?: string;
  title?: string;
  lead?: string;
  content?: string;
  tags?: string;
}>;

type CreatePostResponse = SuccesMessage & {
  data: Post;
};

type UseCreatePost = {
  isPending: boolean;
  createPostMutation: UseMutateFunction<
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
    mutate: createPostMutation,
    isPending,
    error,
  } = useMutation<
    CreatePostResponse,
    AxiosError<CreatePostError | ErrorMessage>,
    CreatePostBody,
    unknown
  >({
    mutationFn: (body) => createPost(body),
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

  return { createPostMutation, isPending, error };
}

async function createPost(body: CreatePostBody): Promise<CreatePostResponse> {
  const postBody = omit(['token', 'image'], body);

  const { data: rawPost } = await axios.post<CreatePostResponse>(
    `${process.env.API_URL}/posts/create`,
    postBody,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  const { data } = await axios.patch<CreatePostResponse>(
    `${process.env.API_URL}/posts/upload/${rawPost.data.id}`,
    body.image,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
