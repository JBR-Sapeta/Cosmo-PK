import {
  IsNotEmpty,
  IsString,
  IsEnum,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { PostStatus } from 'src/types/enum';

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
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
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(60)
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(240)
  lead: string;
}
