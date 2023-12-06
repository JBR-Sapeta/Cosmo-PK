import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UpdateEmailDto {
  @ApiProperty({ required: true })
  @IsEmail({}, { message: 'Please enter correct email address.' })
  readonly newEmail: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
