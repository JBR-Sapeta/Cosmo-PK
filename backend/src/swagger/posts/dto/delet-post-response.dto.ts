import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entity';

export class DeletePostResponseDto {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ default: 'The post has been deleted.' })
  message: string;

  @ApiProperty({ default: null })
  error: string;

  @ApiProperty({ default: null })
  data: Post;
}
