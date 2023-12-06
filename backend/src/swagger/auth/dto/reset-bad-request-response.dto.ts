import { ApiProperty } from '@nestjs/swagger';

export class ResetBadRequestResponseDto {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty({
    example: {
      resetToken: 'Reset token can not be empty.',
      password:
        'Password must contain both uppercase and lowercase letters, one  number and special character.',
    },
  })
  message: object;

  @ApiProperty({ default: 'Bad Request.' })
  error: string;
}
