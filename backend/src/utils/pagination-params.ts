import { IsNumber, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationParams {
  @ApiProperty({
    minimum: 0,
    default: 0,
    title: 'pageNumber',
    format: 'int',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pageNumber?: number = 0;

  @ApiProperty({
    minimum: 0,
    default: 12,
    title: 'limit',
    format: 'int',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 12;
}
