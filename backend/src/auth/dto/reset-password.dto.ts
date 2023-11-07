import { IsString, IsStrongPassword, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  resetToken: string;

  @IsString()
  @IsStrongPassword(
    { minLength: 8 },
    { message: 'Password is not strong enough!' },
  )
  password: string;
}
