import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entity';

export class CreatePostResponseDto {
  @ApiProperty({ default: 201 })
  statusCode: number;

  @ApiProperty({ default: 'Sucess.' })
  message: string;

  @ApiProperty({ example: null })
  error: string;

  @ApiProperty({
    example: {
      id: '8aba4cab-e4f5-4dd7-ad59-1ba2a6b010a5',
      slug: 'firts-cosmo-pk-post',
      status: 'published',
      title: 'First COSMO PK Post',
      lead: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      createdAt: '2023-12-03T20:09:09.268Z',
      updatedAt: '2023-12-03T20:37:30.007Z',
      imageId: null,
      userId: 'be156a0e-1a6f-443a-b329-33e39bda67c8',
      image: null,
      user: {
        username: 'Bob Odell',
        image: {
          id: '48ad125f-b504-4046-9d64-c97e1346ea5c',
          url: '/uploads-dev/avatars/8838547879ebad02e7e073f2563b5841',
          alt: 'User avatar.',
        },
      },
    },
  })
  data: Post;
}
