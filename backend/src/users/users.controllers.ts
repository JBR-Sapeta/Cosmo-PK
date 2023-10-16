import {
  Get,
  Post,
  Patch,
  Body,
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
import { SignInDto, SignUpDto, UpdateEmailDto, UpdatePasswordDto } from './dto';
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
    console.log(signUpUserDto);
    const activationToken = this.authService.createUniqueToken();
    const hashedPassword = await this.authService.hashPassword(password);

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

    const passwordMatch = await this.authService.checkPassword(
      password,
      user.password,
    );

    if (!passwordMatch) {
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

    const passwordMatch = await this.authService.checkPassword(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    await this.usersService.updateEmail(user.id, newEmail);

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

    const passwordMatch = await this.authService.checkPassword(
      password,
      user.password,
    );

    if (!passwordMatch) {
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
}
