import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SuccesMessage } from 'src/types';
import { User } from 'src/users/entity';
import { CurrentUser } from 'src/auth/decorators';

import { PostsService } from './posts.service';
import { Post as PostData } from './entity';
import { CreatePostDto, UpdatePostDto } from './dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('/')
  async getPostsPreview(): Promise<{ data: PostData[] }> {
    const posts = await this.postService.get();

    return { data: posts };
  }

  @Get('/:slug')
  async getPost(@Param('slug') slug: string): Promise<{ data: PostData }> {
    const post = await this.postService.getOne(slug);

    return { data: post };
  }

  @Post('/create')
  @UseGuards(AuthGuard())
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage & { data: PostData }> {
    const post = await this.postService.create(createPostDto, user);

    return {
      statusCode: 201,
      message: 'New post has been created.',
      error: null,
      data: post,
    };
  }

  @Patch('/update/:id')
  @UseGuards(AuthGuard())
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage & { data: PostData }> {
    const post = await this.postService.update(updatePostDto, user, id);

    return {
      statusCode: 200,
      message: 'The post has been updated.',
      error: null,
      data: post,
    };
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard())
  async deletePost(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage & { data: PostData }> {
    const post = await this.postService.delete(user, id);

    return {
      statusCode: 200,
      message: 'The post has been deleted.',
      error: null,
      data: post,
    };
  }
}
