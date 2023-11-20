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
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: 'Enter lowercase sluggified string.',
  })
  @MinLength(10)
  @MaxLength(60)
  slug: string;

  @IsEnum(PostStatus)
  status: PostStatus;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(60)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(240)
  lead: string;
}
