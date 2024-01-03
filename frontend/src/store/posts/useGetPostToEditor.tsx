import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Nullable } from '@Utils/types';

import { Post } from '../types';
import { QUERY_KEY } from '../constant';

type PostData = {
  statusCode: number;
  message: string;
  error: null;
  data: Post;
};

type UseGetPostToEditor = {
  postData: Nullable<PostData>;
  error: Error | null;
  isLoading: boolean;
};

export function useGetPostToEditor(id: string): UseGetPostToEditor {
  const {
    data: postData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.POST_EDITOR, id],
    queryFn: async (): Promise<PostData> => getTags(id),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialData: null,
  });

  return {
    postData,
    error,
    isLoading,
  };
}

export async function getTags(id: string): Promise<PostData> {
  const { data } = await axios.get<PostData>(`${process.env.API_URL}/posts/editor/${id}`);

  return data;
}
