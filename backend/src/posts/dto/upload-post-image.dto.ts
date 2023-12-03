import { MinLength, MaxLength } from 'class-validator';

export class UploadPostImageDto {
  @MinLength(5)
  @MaxLength(124)
  alt: string;
}
