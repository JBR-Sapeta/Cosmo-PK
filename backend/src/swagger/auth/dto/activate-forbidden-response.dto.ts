import { ApiProperty } from '@nestjs/swagger';

export class ActivateForbiddenResponseDto {
  @ApiProperty({ default: 403 })
  statusCode: number;

  @ApiProperty({
    default: 'This account is either active or provided token is invalid.',
  })
  message: string;

  @ApiProperty({ default: 'Forbidden.' })
  error: string;
}
