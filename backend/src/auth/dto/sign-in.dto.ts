import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address.' })
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
