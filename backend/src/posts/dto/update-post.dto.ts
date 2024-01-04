import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { PostStatus } from 'src/types/enum';

export class UpdatePostDto {
  @ApiProperty()
  @IsOptional()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: 'Enter lowercase sluggified string.',
  })
  @MinLength(10)
  @MaxLength(60)
  slug: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiProperty()
  @IsOptional()
  @MinLength(5)
  @MaxLength(60)
  title: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(20)
  @MaxLength(240)
  lead: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(128)
  @MaxLength(2048)
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { each: true })
  tags: number[];
}
