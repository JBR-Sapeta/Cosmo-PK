import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { Tag } from '@Store/types';
import {
  ErrorMessage,
  Nullable,
  SuccesMessage,
} from '@Utils/types';
import { extractError } from '@Utils/functions';

type DeleteTagBody = {
  id: string;
  token: string;
};

type DeleteTagResponse = SuccesMessage & {
  data: Tag;
};

type UseDeleteTag = {
  isPending: boolean;
  deleteTagMutation: UseMutateFunction<
    DeleteTagResponse,
    AxiosError< ErrorMessage>,
    DeleteTagBody,
    unknown
  >;
  error: Nullable<AxiosError<ErrorMessage>>;
};

export function useDeleteTag(): UseDeleteTag {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: deleteTagMutation,
    isPending,
    error,
  } = useMutation<
    DeleteTagResponse,
    AxiosError<ErrorMessage>,
    DeleteTagBody,
    unknown
  >({
    mutationFn: (body) => deleteTag(body),
    onSuccess: (data) => {
      enqueueSnackbar({
        message: data.message,
        variant: 'success',
      });
    },
    onError: (error) => {
      enqueueSnackbar({
        message: extractError(error)?.message,
        variant: 'error',
      });
    },
  });

  return { deleteTagMutation, isPending, error };
}

async function deleteTag(body: DeleteTagBody): Promise<DeleteTagResponse> {
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
