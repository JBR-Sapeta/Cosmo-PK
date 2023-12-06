import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenExceptionResponseDto {
  @ApiProperty({ default: 403 })
  statusCode: number;

  @ApiProperty({ default: 'Forbidden resource' })
  message: string;

  @ApiProperty({ default: 'Forbidden ' })
  error: string;
}
