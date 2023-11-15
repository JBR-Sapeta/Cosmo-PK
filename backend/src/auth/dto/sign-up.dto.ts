import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  @MinLength(3)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address.' })
  readonly email: string;

  @IsString()
  @IsStrongPassword(
    { minLength: 8 },
    { message: 'Password is not strong enough!' },
  )
  readonly password: string;
}
