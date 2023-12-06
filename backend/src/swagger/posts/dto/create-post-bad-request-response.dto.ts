import { ApiProperty } from '@nestjs/swagger';

export class CreatePostBadRequestResponseDto {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty({
    example: {
      pslug: 'Enter lowercase sluggified string.',
      status:
        'status must be one of the following values: draft, published, deleted',
      title: 'title must be longer than or equal to 5 characters',
      lead: 'lead must be longer than or equal to 20 characters',
      content: 'content must be longer than or equal to 128 characters',
    },
  })
  message: object;

  @ApiProperty({ default: 'Bad Request.' })
  error: string;
}
