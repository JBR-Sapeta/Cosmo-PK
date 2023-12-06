import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { PostStatus } from 'src/types/enum';

export class UpdatePostDto {
  @ApiProperty({ required: true })
  @IsOptional()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: 'Enter lowercase sluggified string.',
  })
  @MinLength(10)
  @MaxLength(60)
  slug: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiProperty({ required: true })
  @IsOptional()
  @MinLength(5)
  @MaxLength(60)
  title: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @MinLength(20)
  @MaxLength(240)
  lead: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @MinLength(128)
  @MaxLength(2048)
  content: string;
}
