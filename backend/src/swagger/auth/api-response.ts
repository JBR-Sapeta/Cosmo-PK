import {
  ForbiddenExceptionResponseDto,
  InternalServerErrorExceptionResponseDto,
  NotFoundExceptionResponseDto,
  SucessResponseDto,
  UnauthorizedExceptionResponseDto,
} from '../dto';
import {
  GetUsersResponseDto,
  SignInResponseDto,
  InvalidCredentialsResponseDto,
  ConflictExceptionResponseDto,
  BadGatewayExceptionResponseDto,
  SignUpBadRequestResponseDto,
  ActivateForbiddenResponseDto,
  EmailBadRequestResponseDto,
  RecoveryBadRequestResponseDto,
  ResetBadRequestResponseDto,
  AvatarBadRequestResponseDto,
  DeleteBadRequestResponseDto,
} from './dto';
import { PasswordBadRequestResponseDto } from './dto/password-bad-request-response.dto';

export const RES = {
  getUsers: {
    Ok: {
      status: 200,
      description: 'Succes.',
      type: GetUsersResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Unauthorized.',
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

  signIn: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: SignInResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: InvalidCredentialsResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },

  signUp: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: SucessResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: SignUpBadRequestResponseDto,
    },
    Conflict: {
      status: 409,
      description: 'Conflict.',
      type: ConflictExceptionResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
    BadGateway: {
      status: 502,
      description: 'Bad Gateway.',
      type: BadGatewayExceptionResponseDto,
    },
  },

  activateAccount: {
    Ok: {
      status: 200,
      description: 'Succes.',
      type: SucessResponseDto,
    },
    Forbidden: {
      status: 403,
      description: 'Forbidden.',
      type: ActivateForbiddenResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  whoAmI: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: SignInResponseDto,
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
  updateEmail: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: SucessResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: EmailBadRequestResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: InvalidCredentialsResponseDto,
    },
    Conflict: {
      status: 409,
      description: 'Conflict.',
      type: ConflictExceptionResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  updatePassword: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: SucessResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: PasswordBadRequestResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: InvalidCredentialsResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
  accountRecovery: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: SucessResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: RecoveryBadRequestResponseDto,
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
    BadGateway: {
      status: 502,
      description: 'Bad Gateway.',
      type: BadGatewayExceptionResponseDto,
    },
  },
  resetPassword: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: SucessResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: ResetBadRequestResponseDto,
    },
    Forbidden: {
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

  uploadUserImage: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: SucessResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: AvatarBadRequestResponseDto,
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
  toggleIsActive: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: SucessResponseDto,
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
  deleteAccount: {
    Ok: {
      status: 200,
      description: 'Sucess.',
      type: SucessResponseDto,
    },
    BadRequest: {
      status: 400,
      description: 'Invalid request body.',
      type: DeleteBadRequestResponseDto,
    },
    Unauthorized: {
      status: 401,
      description: 'Invalid credentials.',
      type: InvalidCredentialsResponseDto,
    },
    InternalServerError: {
      status: 500,
      description: 'Internal Server Error.',
      type: InternalServerErrorExceptionResponseDto,
    },
  },
};
