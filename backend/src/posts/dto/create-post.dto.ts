import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Tag } from 'src/tags/entity';
import { PostStatus } from 'src/types/enum';

export class CreatePostDto {
  @ApiProperty({ required: true })
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: 'Enter lowercase sluggified string.',
  })
  @MaxLength(60)
  @MinLength(10)
  slug: string;

  @ApiProperty({ required: false })
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiProperty({ required: true })
  @MaxLength(60)
  @MinLength(5)
  title: string;

  @ApiProperty({ required: true })
  @MaxLength(240)
  @MinLength(20)
  lead: string;

  @ApiProperty({ required: true })
  @MaxLength(2048)
  @MinLength(128)
  content: string;

  @IsNumber({}, { each: true })
  tags: number[];
}
