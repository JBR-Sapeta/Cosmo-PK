import {
  Get,
  Post,
  Body,
  Controller,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SuccesMessage } from 'src/types';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { PostgresErrorCode } from 'src/types';

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
      succes: true,
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
      succes: true,
      token: token,
    };
  }
}
