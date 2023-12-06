import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AccountRecoveryDto {
  @ApiProperty({ required: true })
  @IsEmail({}, { message: 'Please enter correct email address.' })
  readonly email: string;
}
