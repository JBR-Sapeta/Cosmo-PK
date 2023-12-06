import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ required: true })
  @MinLength(3)
  readonly username: string;

  @ApiProperty({ required: true })
  @IsEmail({}, { message: 'Please enter correct email address.' })
  readonly email: string;

  @ApiProperty({ required: true })
  @IsStrongPassword(
    { minLength: 8 },
    {
      message:
        'Password must contain both uppercase and lowercase letters, one  number and special character.',
    },
  )
  readonly password: string;
}
