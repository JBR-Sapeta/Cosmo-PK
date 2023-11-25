import { IsStrongPassword, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  readonly password: string;

  @IsStrongPassword(
    { minLength: 8 },
    { message: 'Password is not strong enough!' },
  )
  readonly newPassword: string;
}
