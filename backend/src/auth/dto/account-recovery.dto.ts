import { IsEmail } from 'class-validator';

export class AccountRecoveryDto {
  @IsEmail({}, { message: 'Please enter correct email address.' })
  readonly email: string;
}
