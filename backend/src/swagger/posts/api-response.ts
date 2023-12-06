import {
  ForbiddenExceptionResponseDto,
  InternalServerErrorExceptionResponseDto,
  NotFoundExceptionResponseDto,
  UnauthorizedExceptionResponseDto,
} from '../dto';
import {
  CreatePostBadRequestResponseDto,
  DeletePostResponseDto,
  GetPostResponseDto,
  GetPostsResponseDto,
  UploadPostImageBadRequestResponseDto,
  UploadPostImageDto,
  UploadPostImageResponseDto,
} from './dto';

export const RES = {
  getPublishedPosts: {
    Ok: {
      status: 200,
      description: 'Succes.',
      type: GetPostsResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  getPostsDrafts: {
    Ok: {
      status: 200,
      description: 'Succes.',
      type: GetPostsResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: UnauthorizedExceptionResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  getDeletedPosts: {
    Ok: {
      status: 200,
      description: 'Succes.',
      type: GetPostsResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: UnauthorizedExceptionResponseDto,
    },
    Frobiden: {
      status: 403,
      description: 'Forbidden.',
      type: ForbiddenExceptionResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  getPost: {
    Ok: {
      status: 200,
      description: 'Succes.',
      type: GetPostResponseDto,
    },
    NotFound: {
      status: 404,
      description: 'Not Found.',
      type: NotFoundExceptionResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  createPost: {
    Ok: {
      status: 201,
      description: 'Succes.',
      type: GetPostResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: CreatePostBadRequestResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: UnauthorizedExceptionResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  updatePost: {
    Ok: {
      status: 200,
      description: 'Succes.',
      type: GetPostResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: CreatePostBadRequestResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: UnauthorizedExceptionResponseDto,
    },
    Forbidden: {
      status: 403,
      description: 'Forbidden.',
      type: ForbiddenExceptionResponseDto,
    },
    NotFound: {
      status: 404,
      description: 'Not Found.',
      type: NotFoundExceptionResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  uploadPostImage: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: UploadPostImageResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: UploadPostImageBadRequestResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: UnauthorizedExceptionResponseDto,
    },
    Forbidden: {
      status: 403,
      description: 'Forbidden.',
      type: ForbiddenExceptionResponseDto,
    },
    NotFound: {
      status: 404,
      description: 'Not Found.',
      type: NotFoundExceptionResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  deletePost: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: DeletePostResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: UnauthorizedExceptionResponseDto,
    },
    Forbidden: {
      status: 403,
      description: 'Forbidden.',
      type: ForbiddenExceptionResponseDto,
    },
    NotFound: {
      status: 404,
      description: 'Not Found.',
      type: NotFoundExceptionResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  removePost: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: DeletePostResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: UnauthorizedExceptionResponseDto,
    },
    Forbidden: {
      status: 403,
      description: 'Forbidden.',
      type: ForbiddenExceptionResponseDto,
    },
    NotFound: {
      status: 404,
      description: 'Not Found.',
      type: NotFoundExceptionResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
};
