import {
  IsEnum,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { PostStatus } from 'src/types/enum';

export class UpdatePostDto {
  @IsOptional()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: 'Enter lowercase sluggified string.',
  })
  @MinLength(10)
  @MaxLength(60)
  slug: string;

  @IsOptional()
  @IsEnum(PostStatus)
  status: PostStatus;

  @IsOptional()
  @MinLength(5)
  @MaxLength(60)
  title: string;

  @IsOptional()
  @MinLength(20)
  @MaxLength(240)
  lead: string;

  @IsOptional()
  @MinLength(128)
  @MaxLength(2048)
  content: string;
}
