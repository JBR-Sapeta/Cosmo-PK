import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/tags/entity';

export class CreateTagResponseDto {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ default: 'New tag has been created.' })
  message: string;

  @ApiProperty({ example: null })
  error: string;

  @ApiProperty({
    example: {
      id: 2,
      name: 'HABSAT',
    },
  })
  data: Tag;
}
