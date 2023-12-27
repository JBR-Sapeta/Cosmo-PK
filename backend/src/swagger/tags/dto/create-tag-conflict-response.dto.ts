import { ApiProperty } from '@nestjs/swagger';

export class CreateTagConflictResponseDto {
  @ApiProperty({ default: 409 })
  statusCode: number;

  @ApiProperty({ default: 'Tag name already in use.' })
  message: string;

  @ApiProperty({ default: 'Conflict.' })
  error: string;
}
