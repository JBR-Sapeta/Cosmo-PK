import { Nullable } from '@Utils/types';

import { ImageData } from './image';
import { UserPreview } from './user';
import { Tag } from './tag';

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  DELETED = 'deleted',
}

export type Post = {
  id: string;
  slug: string;
  status: PostStatus;
  title: string;
  lead: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  imageId: Nullable<string>;
  image: Nullable<ImageData>;
  userId: string;
  user: UserPreview;
  tags: Tag[]; 
};

export type PostPreview = {
  id: string;
  title: string;
  lead: string;
  isActive: boolean;
  createdAt: string;
  image: Nullable<ImageData>;
  tags: number[];
};
