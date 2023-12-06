import { ApiProperty } from '@nestjs/swagger';

export class BadGatewayExceptionResponseDto {
  @ApiProperty({ default: 502 })
  statusCode: number;

  @ApiProperty({ default: 'Email delivery failed.' })
  message: string;

  @ApiProperty({ default: 'Bad Gateway.' })
  error: string;
}
