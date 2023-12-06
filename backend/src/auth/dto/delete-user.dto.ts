import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
