import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ required: true })
  @IsStrongPassword(
    { minLength: 8 },
    { message: 'Password is not strong enough!' },
  )
  readonly newPassword: string;
}
