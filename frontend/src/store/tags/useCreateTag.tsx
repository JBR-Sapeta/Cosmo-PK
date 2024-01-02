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
  createTagMutation: UseMutateFunction<
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
    mutate: createTagMutation,
    isPending,
    error,
  } = useMutation<
    CreateTagResponse,
    AxiosError<CreateTagError | ErrorMessage>,
    CreateTagBody,
    unknown
  >({
    mutationFn: (body) => createTag(body),
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

  return { createTagMutation, isPending, error };
}

async function createTag(body: CreateTagBody): Promise<CreateTagResponse> {
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
