import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Nullable } from '@Utils/types';

import { Tag } from '../types';
import { QUERY_KEY } from '../constant';

type TagData = {
  statusCode: number;
  message: string;
  error: null;
  data: Tag[];
};

type UseTag = {
  tagData: Nullable<TagData>;
  error: Error | null;
  isLoading: boolean;
};

export function useTag(): UseTag {
  const {
    data: tagData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.TAGS],
    queryFn: async (): Promise<TagData> => getTags(),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialData: null,

  });

  return {
    tagData,
    error,
    isLoading,
  };
}

export async function getTags(): Promise<TagData> {
  const { data } = await axios.get<TagData>(`${process.env.API_URL}/tags`);

  return data;
}
