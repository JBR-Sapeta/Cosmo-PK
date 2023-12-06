import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class AvatarUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
