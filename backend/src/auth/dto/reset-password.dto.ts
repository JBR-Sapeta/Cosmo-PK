import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  resetToken: string;

  @ApiProperty({ required: true })
  @IsStrongPassword(
    { minLength: 8 },
    {
      message:
        'Password must contain both uppercase and lowercase letters, one  number and special character.',
    },
  )
  password: string;
}
