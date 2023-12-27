import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/tags/entity';

export class GetTagsResponseDto {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty({ default: 'Sucess.' })
  message: string;

  @ApiProperty({ example: null })
  error: string;

  @ApiProperty({
    example: {
      tags: [
        {
          id: 1,
          name: 'CANSAT',
        },
        {
          id: 2,
          name: 'HABSAT',
        },
        {
          id: 3,
          name: 'Game Dev',
        },
      ],
    },
  })
  data: Tag[];
}
