import { ApiProperty } from '@nestjs/swagger';

export class InvalidCredentialsResponseDto {
  @ApiProperty({ default: 401 })
  statusCode: number;

  @ApiProperty({ default: 'Invalid credentials.' })
  message: string;

  @ApiProperty({ default: 'Unauthorized.' })
  error: string;
}
