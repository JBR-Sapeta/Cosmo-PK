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

type DeleteTagBody = {
  id: string;
  token: string;
};

type DeleteTagError = ValidationError<{
  name: string;
}>;

type DeleteTagResponse = SuccesMessage & {
  data: Tag;
};

type UseCreateTag = {
  isPending: boolean;
  deletePostMutation: UseMutateFunction<
    DeleteTagResponse,
    AxiosError<DeleteTagError | ErrorMessage>,
    DeleteTagBody,
    unknown
  >;
  error: Nullable<AxiosError<DeleteTagError | ErrorMessage>>;
};

export function useCreateTag(): UseCreateTag {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: deletePostMutation,
    isPending,
    error,
  } = useMutation<
    DeleteTagResponse,
    AxiosError<DeleteTagError | ErrorMessage>,
    DeleteTagBody,
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

  return { deletePostMutation, isPending, error };
}

async function createPost(body: DeleteTagBody): Promise<DeleteTagResponse> {
  const { data } = await axios.delete<DeleteTagResponse>(
    `${process.env.API_URL}/tags/${body.id}`,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );

  return data;
}
