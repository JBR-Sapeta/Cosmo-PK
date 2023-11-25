import {
  IsNotEmpty,
  IsString,
  IsEnum,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { PostStatus } from 'src/types/enum';

export class CreatePostDto {
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: 'Enter lowercase sluggified string.',
  })
  @MinLength(10)
  @MaxLength(60)
  slug: string;

  @IsEnum(PostStatus)
  status: PostStatus;

  @MinLength(5)
  @MaxLength(60)
  title: string;

  @MinLength(20)
  @MaxLength(240)
  lead: string;
}
