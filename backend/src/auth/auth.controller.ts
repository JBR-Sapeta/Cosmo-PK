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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MailingService } from 'src/mailing/mailing.service';
import { AuthService } from './auth.service';
import { User } from 'src/users/entity/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SuccesMessage } from 'src/types';
import {
  AccountRecoveryDto,
  DeleteUserDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  UpdateEmailDto,
  UpdatePasswordDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailingService: MailingService,
  ) {}

  @Post('/signup')
  async signUp(@Body() signUpUserDto: SignUpDto): Promise<SuccesMessage> {
    const { username, email, password } = signUpUserDto;
    const activationToken = this.authService.createUniqueToken();
    const hashedPassword = await this.authService.hashPassword(password);
    console.log(activationToken);

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
      message: ['Your account has been successfully created.'],
      error: null,
    };
  }

  @Get('/signin')
  async signIn(
    @Body() signInUserDto: SignInDto,
  ): Promise<SuccesMessage & { token: string; user: User }> {
    const { email, password } = signInUserDto;
    const { token, user } = await this.authService.signIn(email, password);

    return {
      statusCode: 200,
      message: ['You have been successfully logged in.'],
      error: null,
      token: token,
      user: user,
    };
  }

  @Patch('/activate/:token')
  async activateAccount(@Param('token') token: string): Promise<SuccesMessage> {
    await this.authService.activateAccount(token);

    return {
      statusCode: 200,
      message: ['Your account has been activated.'],
      error: null,
    };
  }

  @Get('/whoami')
  @UseGuards(AuthGuard())
  whoAmI(@CurrentUser() user: User): SuccesMessage & { user: User } {
    return {
      statusCode: 200,
      message: [`Hello ${user.username}`],
      error: null,
      user: user,
    };
  }

  @Patch('/email')
  @UseGuards(AuthGuard())
  async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage & { user: User }> {
    const { password, newEmail } = updateEmailDto;

    const updatedUser = await this.authService.updateEmail(
      user.id,
      user.password,
      password,
      newEmail,
    );

    return {
      statusCode: 200,
      message: ['Your E-mail has been successfully updated.'],
      error: null,
      user: updatedUser,
    };
  }

  @Patch('/password')
  @UseGuards(AuthGuard())
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
      message: ['Your password has been successfully updated.'],
      error: null,
    };
  }

  @Post('/recovery')
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
      message: [
        'An email with instructions was sent to you. Follow the instructions in it,to regain access to your account.',
      ],
      error: null,
    };
  }

  @Patch('/recovery')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<SuccesMessage> {
    const { resetToken, password } = resetPasswordDto;

    await this.authService.resetPassword(resetToken, password);

    return {
      statusCode: 200,
      message: ['Your password has been successfully changed.'],
      error: null,
    };
  }

  @Delete('/delete')
  @UseGuards(AuthGuard())
  async deleteAccount(
    @Body() deleteAccountDto: DeleteUserDto,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage> {
    const { password } = deleteAccountDto;

    await this.authService.deleteAccount(user.id, user.password, password);

    return {
      statusCode: 200,
      message: ['Your account has been successfully deleted.'],
      error: null,
    };
  }
}
