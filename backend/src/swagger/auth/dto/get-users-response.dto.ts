import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entity';

export class GetUsersResponseDto {
  @ApiProperty({ default: 0, example: 3 })
  readonly pageNumber: number;
  @ApiProperty({ default: 12, example: 2 })
  readonly limit: number;
  @ApiProperty()
  readonly hasNextPage: boolean;
  @ApiProperty({ example: 5 })
  readonly totalPages: number;
  @ApiProperty({
    type: User,
    isArray: true,
    example: [
      {
        id: 'be156a0e-1a6f-443a-b329-33e39bda67c8',
        username: 'Bob Odell',
        email: 'user1@mail.com',
        roles: ['User'],
        isActive: true,
        createdAt: '2023-11-07T21:16:07.584Z',
        updatedAt: '2023-12-04T18:14:50.649Z',
        imageId: '48ad125f-b504-4046-9d64-c97e1346ea5c',
        image: {
          id: '48ad125f-b504-4046-9d64-c97e1346ea5c',
          url: '/uploads-dev/avatars/8838547879ebad02e7e073f2563b5841',
          alt: 'User avatar.',
        },
      },
      {
        id: '68873050-1c24-4888-a949-050466def12b',
        username: 'John Doe',
        email: 'user@mail.com',
        roles: ['Admin', 'User'],
        isActive: true,
        createdAt: '2023-12-05T19:17:08.300Z',
        updatedAt: '2023-12-05T19:21:49.579Z',
        imageId: null,
        image: null,
      },
    ],
  })
  readonly data: User[];
}
