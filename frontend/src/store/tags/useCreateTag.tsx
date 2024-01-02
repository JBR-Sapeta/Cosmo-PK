import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { Tag } from '@Store/types';
import {
  ErrorMessage,
  Nullable,
  SuccesMessage,
  ValidationError,
} from '@Utils/types';
import { extractErrorMessages } from '@Utils/functions';
import { omit } from 'ramda';

type CreateTagBody = {
  name: string;
  token: string;
};

type CreateTagError = ValidationError<{
  name: string;
}>;

type CreateTagResponse = SuccesMessage & {
  data: Tag;
};

type UseCreateTag = {
  isPending: boolean;
  createPostMutation: UseMutateFunction<
    CreateTagResponse,
    AxiosError<CreateTagError | ErrorMessage>,
    CreateTagBody,
    unknown
  >;
  error: Nullable<AxiosError<CreateTagError | ErrorMessage>>;
};

export function useCreateTag(): UseCreateTag {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: createPostMutation,
    isPending,
    error,
  } = useMutation<
    CreateTagResponse,
    AxiosError<CreateTagError | ErrorMessage>,
    CreateTagBody,
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

async function createPost(body: CreateTagBody): Promise<CreateTagResponse> {
  const postBody = omit(['token'], body);

  const { data } = await axios.post<CreateTagResponse>(
    `${process.env.API_URL}/tags`,
    postBody,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
