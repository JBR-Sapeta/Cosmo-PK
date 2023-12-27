import {
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Controller,
  UseGuards,
  BadGatewayException,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BODY, HEADER, OPERATION, RES } from 'src/swagger/auth';
import { PaginationParams } from 'src/utils';
import { FileSubdirectory, Role } from 'src/types/enum';
import { PageData, SuccesMessage } from 'src/types';
import { FILE_SIZE_LIMIT } from 'src/types/constant';
import { fileFilter } from 'src/files/utils';
import {
  AccountRecoveryDto,
  DeleteUserDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  UpdateEmailDto,
  UpdatePasswordDto,
} from './dto';
import { MailingService } from 'src/mailing/mailing.service';
import { LocalFilesService } from 'src/files/localFiles.service';
import LocalFilesInterceptor from 'src/files/interceptors/localFiles.interceptor';
import { User } from 'src/users/entity/user.entity';

import { AuthService } from './auth.service';
import { JwtGuard, RoleGuard } from './guards';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailingService: MailingService,
    private readonly localFilesService: LocalFilesService,
  ) {}

  @Get('/')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.getUsers)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.getUsers.Ok)
  @ApiResponse(RES.getUsers.Unauthorized)
  @ApiResponse(RES.getUsers.Frobiden)
  @ApiResponse(RES.getUsers.InternalServerError)
  async getUsers(
    @Query() { pageNumber, limit }: PaginationParams,
  ): Promise<PageData<User>> {
    const usersData = await this.authService.getUsers(pageNumber, limit);

    return usersData;
  }

  @Post('/signup')
  @ApiOperation(OPERATION.signUp)
  @ApiResponse(RES.signUp.Ok)
  @ApiResponse(RES.signUp.BadRequest)
  @ApiResponse(RES.signUp.Conflict)
  @ApiResponse(RES.signUp.InternalServerError)
  @ApiResponse(RES.signUp.BadGateway)
  async signUp(@Body() signUpUserDto: SignUpDto): Promise<SuccesMessage> {
    const { username, email, password } = signUpUserDto;
    const activationToken = this.authService.createUniqueToken();
    const hashedPassword = await this.authService.hashPassword(password);

    try {
      await this.mailingService.sendActivationMail(
        email,
        username,
        activationToken,
      );
    } catch {
      throw new BadGatewayException('Email delivery failed.');
    }

    await this.authService.signUp(
      username,
      email,
      hashedPassword,
      activationToken,
    );

    return {
      statusCode: 201,
      message: 'Your account has been successfully created.',
      error: null,
    };
  }

  @Post('/signin')
  @ApiOperation(OPERATION.signIn)
  @ApiResponse(RES.signIn.Ok)
  @ApiResponse(RES.signIn.Unauthorized)
  @ApiResponse(RES.signIn.InternalServerError)
  async signIn(
    @Body() signInUserDto: SignInDto,
  ): Promise<
    SuccesMessage & { token: string; data: User; expirationDate: string }
  > {
    const { email, password } = signInUserDto;
    const { token, user, expirationDate } = await this.authService.signIn(
      email,
      password,
    );

    return {
      statusCode: 200,
      message: 'You have been successfully logged in.',
      error: null,
      token: token,
      data: user,
      expirationDate: expirationDate,
    };
  }

  @Patch('/activate/:token')
  @ApiOperation(OPERATION.activateAccount)
  @ApiResponse(RES.activateAccount.Ok)
  @ApiResponse(RES.activateAccount.Forbidden)
  @ApiResponse(RES.activateAccount.InternalServerError)
  async activateAccount(@Param('token') token: string): Promise<SuccesMessage> {
    await this.authService.activateAccount(token);

    return {
      statusCode: 200,
      message: 'Account has been activated.',
      error: null,
    };
  }

  @Get('/whoami')
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.whoAmI)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.whoAmI.Ok)
  @ApiResponse(RES.whoAmI.Unauthorized)
  @ApiResponse(RES.whoAmI.InternalServerError)
  whoAmI(
    @CurrentUser() user: User,
  ): SuccesMessage & { token: string; data: User; expirationDate: string } {
    const { token, expirationDate } = this.authService.refreshToken(user.id);

    return {
      statusCode: 200,
      message: `Hello ${user.username}`,
      error: null,
      data: user,
      token: token,
      expirationDate: expirationDate,
    };
  }

  @Patch('/email')
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.updateEmail)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.updateEmail.Ok)
  @ApiResponse(RES.updateEmail.Unauthorized)
  @ApiResponse(RES.updateEmail.Conflict)
  @ApiResponse(RES.updateEmail.InternalServerError)
  async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage> {
    const { password, newEmail } = updateEmailDto;

    await this.authService.updateEmail(
      user.id,
      user.password,
      password,
      newEmail,
    );

    return {
      statusCode: 200,
      message: 'Your E-mail has been successfully updated.',
      error: null,
    };
  }

  @Patch('/password')
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.updatePassword)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.updatePassword.Ok)
  @ApiResponse(RES.updatePassword.Unauthorized)
  @ApiResponse(RES.updatePassword.InternalServerError)
  async updatePassword(
    @Body() updateEmailDto: UpdatePasswordDto,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage> {
    const { password, newPassword } = updateEmailDto;

    await this.authService.updatePassword(
      user.id,
      user.password,
      password,
      newPassword,
    );

    return {
      statusCode: 200,
      message: 'Your password has been successfully updated.',
      error: null,
    };
  }

  @Post('/recovery')
  @ApiOperation(OPERATION.accountRecovery)
  @ApiResponse(RES.accountRecovery.Ok)
  @ApiResponse(RES.accountRecovery.BadRequest)
  @ApiResponse(RES.accountRecovery.NotFound)
  @ApiResponse(RES.accountRecovery.InternalServerError)
  @ApiResponse(RES.accountRecovery.BadGateway)
  async accountRecovery(
    @Body() accountRecoveryDto: AccountRecoveryDto,
  ): Promise<SuccesMessage> {
    const { email } = accountRecoveryDto;
    const resetToken = this.authService.createUniqueToken();

    const username = await this.authService.setResetToken(email, resetToken);

    try {
      await this.mailingService.sendRecoveryMail(email, username, resetToken);
    } catch {
      throw new BadGatewayException('Email delivery failed.');
    }

    return {
      statusCode: 200,
      message:
        'An email with instructions was sent to you. Follow the instructions in it,to regain access to your account.',
      error: null,
    };
  }

  @Patch('/reset')
  @ApiOperation(OPERATION.resetPassword)
  @ApiResponse(RES.resetPassword.Ok)
  @ApiResponse(RES.resetPassword.BadRequest)
  @ApiResponse(RES.resetPassword.Forbidden)
  @ApiResponse(RES.resetPassword.InternalServerError)
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<SuccesMessage> {
    const { resetToken, password } = resetPasswordDto;

    await this.authService.resetPassword(resetToken, password);

    return {
      statusCode: 200,
      message: 'Your password has been successfully changed.',
      error: null,
    };
  }

  @Patch('/avatar')
  @UseGuards(JwtGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: FileSubdirectory.AVATARS,
      fileFilter,
      limits: {
        fileSize: FILE_SIZE_LIMIT.AVATAR,
      },
    }),
  )
  @ApiOperation(OPERATION.uploadUserImage)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiConsumes('multipart/form-data')
  @ApiBody(BODY.avatar)
  @ApiResponse(RES.uploadUserImage.Ok)
  @ApiResponse(RES.uploadUserImage.BadRequest)
  @ApiResponse(RES.uploadUserImage.Unauthorized)
  @ApiResponse(RES.uploadUserImage.InternalServerError)
  async uploadUserImage(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<SuccesMessage> {
    const image = await this.localFilesService.saveLocalFile({
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
      alt: 'User avatar.',
    });

    const oldImage = user.imageId;

    await this.authService.addImage(image, user);

    if (oldImage) {
      await this.localFilesService.removeLocalFile(oldImage);
    }

    return {
      statusCode: 200,
      message: 'New avatar has been uploaded.',
      error: null,
    };
  }

  @Patch('/isactive/:id')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.toggleIsActive)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.toggleIsActive.Ok)
  @ApiResponse(RES.toggleIsActive.Unauthorized)
  @ApiResponse(RES.toggleIsActive.Forbidden)
  @ApiResponse(RES.toggleIsActive.NotFound)
  @ApiResponse(RES.toggleIsActive.InternalServerError)
  async toggleIsActive(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<SuccesMessage> {
    await this.authService.toggleActiveStatus(id);

    return {
      statusCode: 200,
      message: 'User data has been changed.',
      error: null,
    };
  }

  @Delete('/delete')
  @UseGuards(JwtGuard)
  @ApiOperation(OPERATION.deleteAccount)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.deleteAccount.Ok)
  @ApiResponse(RES.deleteAccount.BadRequest)
  @ApiResponse(RES.deleteAccount.Unauthorized)
  @ApiResponse(RES.deleteAccount.InternalServerError)
  async deleteAccount(
    @Body() deleteAccountDto: DeleteUserDto,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage> {
    const { password } = deleteAccountDto;

    await this.authService.deleteAccount(user.id, user.password, password);

    return {
      statusCode: 200,
      message: 'Your account has been successfully deleted.',
      error: null,
    };
  }
}
