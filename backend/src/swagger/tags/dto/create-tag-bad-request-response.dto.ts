import { ApiProperty } from '@nestjs/swagger';

export class CreateTagBadRequestResponseDto {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty({
    example: {
      name: 'Name must be longer than or equal to 3 characters.',
    },
  })
  message: object;

  @ApiProperty({ default: 'Bad Request.' })
  error: string;
}
