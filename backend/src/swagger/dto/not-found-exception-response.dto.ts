import { ApiProperty } from '@nestjs/swagger';

export class NotFoundExceptionResponseDto {
  @ApiProperty({ default: 404 })
  statusCode: number;

  @ApiProperty({ default: 'Resource not found.' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}
