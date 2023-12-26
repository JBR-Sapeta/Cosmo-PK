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
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationParams } from 'src/utils';
import { SuccesMessage, PageData, Nullish } from 'src/types';
import { FILE_SIZE_LIMIT } from 'src/types/constant';
import { FileSubdirectory, PostStatus, Role } from 'src/types/enum';
import { fileFilter } from 'src/files/utils';
import { LocalFilesService } from 'src/files/localFiles.service';
import { CacheService } from 'src/cache/cache.service';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/auth/decorators';
import LocalFilesInterceptor from 'src/files/interceptors/localFiles.interceptor';
import { User } from 'src/users/entity';

import { PostsService } from './posts.service';
import { Post as PostData } from './entity';
import { CreatePostDto, UpdatePostDto, UploadPostImageDto } from './dto';
import { BODY, HEADER, OPERATION, RES } from 'src/swagger/posts';
import { composeKey } from 'src/cache/utils';
import { TagsService } from 'src/tags/tags.service';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(
    private readonly postService: PostsService,
    private readonly cacheService: CacheService,
    private readonly localFilesService: LocalFilesService,
    private readonly tagService: TagsService,
  ) {}

  @Get('/')
  @ApiOperation(OPERATION.getPublishedPosts)
  @ApiResponse(RES.getPublishedPosts.Ok)
  @ApiResponse(RES.getPublishedPosts.InternalServerError)
  async getPublishedPostsPreview(
    @Query() { pageNumber, limit }: PaginationParams,
  ): Promise<PageData<PostData>> {
    const key = composeKey(PostStatus.PUBLISHED, pageNumber, limit);
    let posts: Nullish<PageData<PostData>> = null;
    const postsInRedis: Nullish<PageData<PostData>> =
      await this.cacheService.retriveData<PageData<PostData>>(key);

    if (!postsInRedis) {
      posts = await this.postService.getPosts(
        PostStatus.PUBLISHED,
        pageNumber,
        limit,
      );
    }

    if (!postsInRedis && posts) {
      this.cacheService.storeData(key, posts);
    }

    return postsInRedis || posts;
  }

  @Get('/drafts')
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.getPostsDrafts)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.getPostsDrafts.Ok)
  @ApiResponse(RES.getPostsDrafts.Unauthorized)
  @ApiResponse(RES.getPostsDrafts.InternalServerError)
  async getPostsDraftsPreview(
    @Query() { pageNumber, limit }: PaginationParams,
  ): Promise<PageData<PostData>> {
    const key = composeKey(PostStatus.DRAFT, pageNumber, limit);
    let posts: Nullish<PageData<PostData>> = null;
    const postsInRedis: Nullish<PageData<PostData>> =
      await this.cacheService.retriveData<PageData<PostData>>(key);

    if (!postsInRedis) {
      posts = await this.postService.getPosts(
        PostStatus.DRAFT,
        pageNumber,
        limit,
      );
    }

    if (!postsInRedis && posts) {
      this.cacheService.storeData(key, posts);
    }

    return postsInRedis || posts;
  }

  @Get('/deleted')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.getDeletedPosts)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.getDeletedPosts.Ok)
  @ApiResponse(RES.getDeletedPosts.Unauthorized)
  @ApiResponse(RES.getDeletedPosts.Frobiden)
  @ApiResponse(RES.getDeletedPosts.InternalServerError)
  async getDeletedPostsPreview(
    @Query() { pageNumber, limit }: PaginationParams,
  ): Promise<PageData<PostData>> {
    const key = composeKey(PostStatus.DELETED, pageNumber, limit);
    let posts: Nullish<PageData<PostData>> = null;
    const postsInRedis: Nullish<PageData<PostData>> =
      await this.cacheService.retriveData<PageData<PostData>>(key);

    if (!postsInRedis) {
      posts = await this.postService.getPosts(
        PostStatus.DELETED,
        pageNumber,
        limit,
      );
    }

    if (!postsInRedis && posts) {
      this.cacheService.storeData(key, posts);
    }

    return postsInRedis || posts;
  }

  @Get('/tag/:id')
  async getPostsByTag(
    @Query() { pageNumber, limit }: PaginationParams,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<PageData<PostData>> {
    const key = composeKey(id, pageNumber, limit);
    let posts: Nullish<PageData<PostData>> = null;
    const postsInRedis: Nullish<PageData<PostData>> =
      await this.cacheService.retriveData<PageData<PostData>>(key);

    if (!postsInRedis) {
      posts = await this.postService.getPostsByTag(id, pageNumber, limit);
    }

    if (!postsInRedis && posts) {
      this.cacheService.storeData(key, posts);
    }

    return postsInRedis || posts;
  }

  @Get('/:slug')
  @ApiOperation(OPERATION.getPost)
  @ApiResponse(RES.getPost.Ok)
  @ApiResponse(RES.getPost.NotFound)
  @ApiResponse(RES.getPost.InternalServerError)
  async getPost(
    @Param('slug') slug: string,
  ): Promise<SuccesMessage & { data: PostData }> {
    let post: Nullish<PostData> = null;
    const postInRedis: Nullish<PostData> =
      await this.cacheService.retriveData<PostData>(slug);

    if (!postInRedis) {
      post = await this.postService.getOneBySlug(slug);
    }

    if (!postInRedis && post) {
      this.cacheService.storeData(slug, post);
    }

    return {
      statusCode: 200,
      message: 'Ok.',
      error: null,
      data: postInRedis || post,
    };
  }

  @Post('/create')
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.createPost)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.createPost.Ok)
  @ApiResponse(RES.createPost.BadRequest)
  @ApiResponse(RES.createPost.Unauthorized)
  @ApiResponse(RES.createPost.InternalServerError)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage & { data: PostData }> {
    const tags = await this.tagService.getTagsByids(createPostDto.tags);

    const post = await this.postService.create(createPostDto, user, tags);

    return {
      statusCode: 201,
      message: 'New post has been created.',
      error: null,
      data: post,
    };
  }

  @Patch('/update/:id')
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.updatePost)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.updatePost.Ok)
  @ApiResponse(RES.updatePost.BadRequest)
  @ApiResponse(RES.updatePost.Unauthorized)
  @ApiResponse(RES.updatePost.Forbidden)
  @ApiResponse(RES.updatePost.NotFound)
  @ApiResponse(RES.updatePost.InternalServerError)
  async updatePost(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage & { data: PostData }> {
    const tags = await this.tagService.getTagsByids(updatePostDto.tags);

    const post = await this.postService.update(updatePostDto, user, tags, id);

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
  @ApiOperation(OPERATION.uploadPostImage)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiBody(BODY.uploadPostImage)
  @ApiResponse(RES.uploadPostImage.Ok)
  @ApiResponse(RES.uploadPostImage.BadRequest)
  @ApiResponse(RES.uploadPostImage.Unauthorized)
  @ApiResponse(RES.uploadPostImage.Forbidden)
  @ApiResponse(RES.uploadPostImage.NotFound)
  @ApiResponse(RES.uploadPostImage.InternalServerError)
  async uploadPostImage(
    @Param('id', new ParseUUIDPipe()) id: string,
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
  @ApiOperation(OPERATION.deletePost)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.deletePost.Ok)
  @ApiResponse(RES.deletePost.Unauthorized)
  @ApiResponse(RES.deletePost.Forbidden)
  @ApiResponse(RES.deletePost.NotFound)
  @ApiResponse(RES.deletePost.InternalServerError)
  async deletePost(
    @Param('id', new ParseUUIDPipe()) id: string,
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
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.removePost)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.removePost.Ok)
  @ApiResponse(RES.removePost.Unauthorized)
  @ApiResponse(RES.removePost.Forbidden)
  @ApiResponse(RES.removePost.NotFound)
  @ApiResponse(RES.removePost.InternalServerError)
  async removePost(
    @Param('id', new ParseUUIDPipe()) id: string,
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
