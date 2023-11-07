import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
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
