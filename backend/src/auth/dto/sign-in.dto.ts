import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Please enter correct email address.' })
  readonly email: string;

  @IsNotEmpty({ message: 'Please enter password.' })
  readonly password: string;
}
