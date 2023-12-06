import { ApiProperty } from '@nestjs/swagger';

export class PasswordBadRequestResponseDto {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty({
    example: {
      password: 'Password can not be empty.',
      newPassword:
        'Password must contain both uppercase and lowercase letters, one  number and special character.',
    },
  })
  message: object;

  @ApiProperty({ default: 'Bad Request.' })
  error: string;
}
