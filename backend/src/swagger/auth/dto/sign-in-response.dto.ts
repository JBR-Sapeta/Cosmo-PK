import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entity';

export class SignInResponseDto {
  @ApiProperty({ default: 200 })
  readonly statusCode: number;
  @ApiProperty({ default: 'Message.' })
  readonly message: string;
  @ApiProperty({ example: null })
  readonly error: string;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZTE1NmEwZS0xYTZmLTQ0M2EtYjMyOS0zM2UzOWJkYTY3YzgiLCJpYXQiOjE3MDE4MTU2NjYsImV4cCI6MTcwMTgxOTI2Nn0.KzxHW0FB3av0TOIDKKau5P98e-yASg1-Cy_b6Qn2AKQ',
  })
  readonly token: string;
  @ApiProperty({ example: '2023-12-05T23:34:26.810Z' })
  readonly expirationDate: string;
  @ApiProperty({
    type: User,
    example: {
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
  })
  readonly data: User[];
}
