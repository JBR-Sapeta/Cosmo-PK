import { ApiProperty } from '@nestjs/swagger';

export class SignUpBadRequestResponseDto {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty({
    example: {
      username: 'Username must be at least 3 characters long.',
      email: 'Please enter correct email address.',
      password:
        'Password must contain both uppercase and lowercase letters, one  number and special character.',
    },
  })
  message: object;

  @ApiProperty({ default: 'Bad Request.' })
  error: string;
}
