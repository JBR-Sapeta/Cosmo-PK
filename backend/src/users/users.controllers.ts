import {
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Controller,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import {
  SignInDto,
  SignUpDto,
  UpdateEmailDto,
  UpdatePasswordDto,
  DeleteUserDto,
} from './dto';
import { User } from './entity/user.entity';
import { SuccesMessage, PostgresErrorCode } from 'src/types';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signUp(@Body() signUpUserDto: SignUpDto): Promise<SuccesMessage> {
    const { username, email, password } = signUpUserDto;
    const activationToken = this.authService.createUniqueToken();
    const hashedPassword = await this.authService.hashPassword(password);
    console.log(activationToken);
    try {
      await this.usersService.createUser(
        username,
        email,
        hashedPassword,
        activationToken,
      );
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('Email or username already in use.');
      }
      throw new InternalServerErrorException();
    }

    return {
      statusCode: 201,
      message: ['Your account has been successfully created.'],
      error: null,
    };
  }

  @Get('/signin')
  async signIn(
    @Body() signInUserDto: SignInDto,
  ): Promise<SuccesMessage & { token: string }> {
    const { email, password } = signInUserDto;
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Your account is inactive.');
    }

    const isValidPassword = await this.authService.checkPassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = this.jwtService.sign({
      userId: user.id,
    });

    return {
      statusCode: 200,
      message: ['You have been successfully logged in.'],
      error: null,
      token: token,
    };
  }

  @Patch('/activate/:token')
  async activateAccount(@Param('token') token: string): Promise<SuccesMessage> {
    await this.usersService.activateAccount(token);

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
  ): Promise<SuccesMessage> {
    const { password, newEmail } = updateEmailDto;

    const isValidPassword = await this.authService.checkPassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    try {
      await this.usersService.updateEmail(user.id, newEmail);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('Email already in use.');
      }
      throw new InternalServerErrorException();
    }

    return {
      statusCode: 200,
      message: ['Your E-mail has been successfully updated.'],
      error: null,
    };
  }

  @Patch('/password')
  @UseGuards(AuthGuard())
  async updatePassword(
    @Body() updateEmailDto: UpdatePasswordDto,
    @CurrentUser() user: User,
  ): Promise<SuccesMessage> {
    const { password, newPassword } = updateEmailDto;

    const isValidPassword = await this.authService.checkPassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const hashedPassword = await this.authService.hashPassword(newPassword);

    await this.usersService.updatePassword(user.id, hashedPassword);

    return {
      statusCode: 200,
      message: ['Your password has been successfully updated.'],
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

    const isValidPassword = await this.authService.checkPassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    await this.usersService.deleteUser(user.id);

    return {
      statusCode: 200,
      message: ['Your account has been successfully deleted.'],
      error: null,
    };
  }
}
