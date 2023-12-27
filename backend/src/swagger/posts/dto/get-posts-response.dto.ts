import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entity';

export class GetPostsResponseDto {
  @ApiProperty({ default: 0, example: 3 })
  readonly pageNumber: number;
  @ApiProperty({ default: 12, example: 2 })
  readonly limit: number;
  @ApiProperty({ example: true })
  readonly hasNextPage: boolean;
  @ApiProperty({ example: 5 })
  readonly totalPages: number;
  @ApiProperty({
    type: Post,
    isArray: true,
    example: [
      {
        id: '8aba4cab-e4f5-4dd7-ad59-1ba2a6b010a5',
        title: 'First COSMO PK Post',
        lead: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
        createdAt: '2023-12-03T20:09:09.268Z',
        tags: [],
        image: {
          id: 'aaff809a-4a1d-48ea-89e7-2590c4243c6e',
          url: '/uploads-dev/posts/461208f2c84cb361f583c0f76840955e',
          alt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
      },
      {
        id: '68873050-1c24-4888-a949-050466def12b',
        title: 'Second COSMO PK Post',
        lead: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
        createdAt: '2023-12-03T20:09:09.268Z',
        tags: [
          {
            id: 1,
            name: 'CANSAT',
          },
        ],
        image: {
          id: 'cdf3809a-4a1d-67ad-89e7-050466def12b',
          url: '/uploads-dev/posts/42418f2c84cb361f522c0f75442355e',
          alt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
      },
    ],
  })
  readonly data: Post[];
}

{
}
