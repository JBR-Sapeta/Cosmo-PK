import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorExceptionResponseDto {
  @ApiProperty({ default: 500 })
  statusCode: number;

  @ApiProperty({ default: 'Internal Server Error' })
  message: string;
}
