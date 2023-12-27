import {
  ForbiddenExceptionResponseDto,
  InternalServerErrorExceptionResponseDto,
  NotFoundExceptionResponseDto,
  UnauthorizedExceptionResponseDto,
} from '../dto';
import {
  CreateTagBadRequestResponseDto,
  CreateTagConflictResponseDto,
  CreateTagResponseDto,
  GetTagsResponseDto,
} from './dto';

export const RES = {
  getTags: {
    Ok: {
      status: 200,
      description: 'Succes.',
      type: GetTagsResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  createTag: {
    Ok: {
      status: 200,
      description: 'Succes.',
      type: CreateTagResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: CreateTagBadRequestResponseDto,
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
    Conflict: {
      status: 409,
      description: 'Conflict.',
      type: CreateTagConflictResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  deleteTag: {
    Ok: {
      status: 200,
      description: 'Succes.',
      type: CreateTagResponseDto,
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
