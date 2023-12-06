import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationParams } from 'src/utils';
import { SuccesMessage, PageData } from 'src/types';
import { FILE_SIZE_LIMIT } from 'src/types/constant';
import { FileSubdirectory, PostStatus, Role } from 'src/types/enum';
import { fileFilter } from 'src/files/utils';
import { LocalFilesService } from 'src/files/localFiles.service';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/auth/decorators';
import LocalFilesInterceptor from 'src/files/interceptors/localFiles.interceptor';
import { User } from 'src/users/entity';

import { PostsService } from './posts.service';
import { Post as PostData } from './entity';
import { CreatePostDto, UpdatePostDto, UploadPostImageDto } from './dto';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(
    private readonly postService: PostsService,
    private readonly localFilesService: LocalFilesService,
  ) {}

  @Get('/')
  async getPublishedPostsPreview(
    @Query() { pageNumber, limit }: PaginationParams,
  ): Promise<PageData<PostData>> {
    const postsData = await this.postService.getPosts(
      PostStatus.PUBLISHED,
      pageNumber,
      limit,
    );

    return postsData;
  }

  @Get('/drafts')
  @UseGuards(JwtGuard)
  async getPostsDraftsPreview(
    @Query() { pageNumber, limit }: PaginationParams,
  ): Promise<PageData<PostData>> {
    const postsData = await this.postService.getPosts(
      PostStatus.DRAFT,
      pageNumber,
      limit,
    );

    return postsData;
  }

  @Get('/deleted')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtGuard)
  async getDeletedPostsPreview(
    @Query() { pageNumber, limit }: PaginationParams,
  ): Promise<PageData<PostData>> {
    const postsData = await this.postService.getPosts(
      PostStatus.DELETED,
      pageNumber,
      limit,
    );

    return postsData;
  }

  @Get('/:slug')
  async getPost(
    @Param('slug') slug: string,
  ): Promise<SuccesMessage & { data: PostData }> {
    const post = await this.postService.getOneBySlug(slug);

    return {
      statusCode: 200,
      message: 'Ok.',
      error: null,
      data: post,
    };
  }

  @Post('/create')
  @UseGuards(JwtGuard)
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
  @UseGuards(JwtGuard)
  async updatesPost(
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

  @Patch('/upload/:id')
  @UseGuards(JwtGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: FileSubdirectory.POSTS,
      fileFilter,
      limits: {
        fileSize: FILE_SIZE_LIMIT.POST,
      },
    }),
  )
  async uploadPostImage(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadPostImageDto: UploadPostImageDto,
  ): Promise<SuccesMessage & { data: PostData }> {
    const image = await this.localFilesService.saveLocalFile({
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
      ...uploadPostImageDto,
    });

    const post = await this.postService.getOneById(id);

    if (!post) {
      await this.localFilesService.removeLocalFile(image.id);
      throw new NotFoundException('Post not found.');
    }
    const oldImage = post.imageId;

    const updatedPost = await this.postService.addImage(image, post, user);

    if (oldImage) {
      await this.localFilesService.removeLocalFile(oldImage);
    }

    return {
      statusCode: 200,
      message: 'The post has been updated.',
      error: null,
      data: updatedPost,
    };
  }

  @Patch('/delete/:id')
  @UseGuards(JwtGuard)
  async deletePost(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage & { data: null }> {
    await this.postService.delete(user, id);

    return {
      statusCode: 200,
      message: 'The post has been deleted.',
      error: null,
      data: null,
    };
  }

  @Delete('/remove/:id')
  @UseGuards(JwtGuard)
  @UseGuards(RoleGuard(Role.ADMIN))
  async removePost(
    @Param('id') id: string,
  ): Promise<SuccesMessage & { data: null }> {
    const post = await this.postService.remove(id);

    if (post.imageId) {
      await this.localFilesService.removeLocalFile(post.imageId);
    }

    return {
      statusCode: 200,
      message: 'The post has been deleted.',
      error: null,
      data: null,
    };
  }
}
