import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Nullish } from '@Utils/types';

import { Tag } from '../types';
import { QUERY_KEY } from '../constant';

type TagData = {
  statusCode: number;
  message: string;
  error: null;
  data: Tag[];
};

type UseTag = {
  tagData: Nullish<TagData>;
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
    queryFn: async (): Promise<Nullish<TagData>> => getTags(),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return {
    tagData,
    error,
    isLoading,
  };
}

export async function getTags(): Promise<Nullish<TagData>> {
  const { data } = await axios.get<TagData>(`${process.env.API_URL}/tags`);

  return data;
}
