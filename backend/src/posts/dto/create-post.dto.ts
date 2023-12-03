import { IsEnum, Matches, MinLength, MaxLength } from 'class-validator';
import { PostStatus } from 'src/types/enum';

export class CreatePostDto {
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: 'Enter lowercase sluggified string.',
  })
  @MaxLength(60)
  @MinLength(10)
  slug: string;

  @IsEnum(PostStatus)
  status: PostStatus;

  @MaxLength(60)
  @MinLength(5)
  title: string;

  @MaxLength(240)
  @MinLength(20)
  lead: string;

  @MaxLength(2048)
  @MinLength(128)
  content: string;
}
