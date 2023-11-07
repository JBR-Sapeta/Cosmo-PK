import { IsNotEmpty, IsEmail } from 'class-validator';

export class AccountRecoveryDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address.' })
  readonly email: string;
}
