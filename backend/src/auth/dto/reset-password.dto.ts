import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  resetToken: string;

  @IsStrongPassword(
    { minLength: 8 },
    {
      message:
        'Password must contain both uppercase and lowercase letters, one  number and special character.',
    },
  )
  password: string;
}
