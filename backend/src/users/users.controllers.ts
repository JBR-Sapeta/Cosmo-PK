import { Post, Body, Controller } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SuccesMessage } from 'src/interfaces';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(@Body() signUpUserDto: SignUpDto): Promise<SuccesMessage> {
    const { username, email, password } = signUpUserDto;
    console.log(signUpUserDto);
    const activationToken = this.authService.createUniqueToken();
    const hashedPassword = await this.authService.hashPassword(password);

    await this.usersService.createUser(
      username,
      email,
      hashedPassword,
      activationToken,
    );

    return {
      statusCode: 201,
      message: ['Your account has been successfully created.'],
      succes: true,
    };
  }
}
