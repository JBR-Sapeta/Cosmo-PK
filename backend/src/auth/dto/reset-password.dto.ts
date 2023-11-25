import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  resetToken: string;

  @IsStrongPassword(
    { minLength: 8 },
    { message: 'Password is not strong enough!' },
  )
  password: string;
}
