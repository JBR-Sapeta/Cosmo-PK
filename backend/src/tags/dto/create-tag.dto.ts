import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ required: true })
  @MaxLength(24)
  @MinLength(3)
  name: string;
}
