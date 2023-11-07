import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmailDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address.' })
  readonly newEmail: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
