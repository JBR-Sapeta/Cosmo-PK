import { IsEmail, MinLength, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @MinLength(3)
  readonly username: string;

  @IsEmail({}, { message: 'Please enter correct email address.' })
  readonly email: string;

  @IsStrongPassword(
    { minLength: 8 },
    {
      message:
        'Password must contain at least one lowercase, one uppercase, one special character, and one number.',
    },
  )
  readonly password: string;
}
