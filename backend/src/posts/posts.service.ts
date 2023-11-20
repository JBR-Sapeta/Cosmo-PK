import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Nullable } from 'src/types';
import { PostStatus } from 'src/types/enum';
import { User } from 'src/users/entity';
import { Post } from './entity';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  /**
   * Asynchronously searches for a posts.
   * Throws an Error in case of failure.
   */
  async get(): Promise<Post[]> {
    let posts: Nullable<Post[]> = null;

    try {
      posts = await this.postsRepository.find();
    } catch {
      throw new InternalServerErrorException();
    }

    return posts;
  }

  /**
   * Asynchronously searches for a post with given slug.
   * Throws an Error in case of failure.
   */
  async getOne(slug: string): Promise<Post> {
    let post: Nullable<Post> = null;

    try {
      post = await this.postsRepository.findOneBy({ slug });
    } catch {
      throw new InternalServerErrorException();
    }

    if (!post) {
      throw new NotFoundException('User not found.');
    }

    return post;
  }

  /**
   * Asynchronously creates new Post record in database.
   * Throws an Error in case of failure.
   */
  async create(postData: CreatePostDto, user: User): Promise<Post> {
    const post = this.postsRepository.create(postData);
    post.user = user;

    try {
      const newPost = await this.postsRepository.save(post);
      return newPost;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously updates post in database.
   * Throws an Error in case of failure.
   */
  async update(postData: UpdatePostDto, user: User, id: string): Promise<Post> {
    let post: Nullable<Post> = null;

    try {
      post = await this.postsRepository.findOneBy({ id });
    } catch {
      throw new InternalServerErrorException();
    }

    if (!post) {
      throw new NotFoundException('User not found.');
    }

    if (post.user.id !== user.id) {
      throw new ForbiddenException('You are not allowed to edit this post.');
    }

    Object.assign(post, postData);

    try {
      const updatedPost = await this.postsRepository.save(post);
      return updatedPost;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously deletes post with given id from database.
   * It sets status property to 'deleted.'
   * Throws an Error in case of failure.
   */
  async delete(user: User, id: string): Promise<Post> {
    let post: Nullable<Post> = null;

    try {
      post = await this.postsRepository.findOneBy({ id });
    } catch {
      throw new InternalServerErrorException();
    }

    if (!post) {
      throw new NotFoundException('User not found.');
    }

    if (post.user.id !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this post.');
    }

    post.status = PostStatus.DELETED;

    try {
      const deletedPost = await this.postsRepository.save(post);
      return deletedPost;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
