import { ApiProperty } from '@nestjs/swagger';

export class DeleteBadRequestResponseDto {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty({
    example: {
      password: 'Password can not be empty.',
    },
  })
  message: object;

  @ApiProperty({ default: 'Bad Request.' })
  error: string;
}
