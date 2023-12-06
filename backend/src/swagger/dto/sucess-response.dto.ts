import { ApiProperty } from '@nestjs/swagger';

export class SucessResponseDto {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ default: 'Sucess.' })
  message: string;

  @ApiProperty({ example: null })
  error: string;
}
