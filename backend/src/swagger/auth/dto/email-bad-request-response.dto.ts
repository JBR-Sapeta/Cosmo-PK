import { ApiProperty } from '@nestjs/swagger';

export class EmailBadRequestResponseDto {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty({
    example: {
      newEmail: 'Please enter correct email address.',
      password: 'Password can not be empty.',
    },
  })
  message: object;

  @ApiProperty({ default: 'Bad Request.' })
  error: string;
}
