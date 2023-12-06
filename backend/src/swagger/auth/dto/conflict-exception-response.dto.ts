import { ApiProperty } from '@nestjs/swagger';

export class ConflictExceptionResponseDto {
  @ApiProperty({ default: 409 })
  statusCode: number;

  @ApiProperty({ default: 'Email or username already in use.' })
  message: string;

  @ApiProperty({ default: 'Conflict.' })
  error: string;
}
