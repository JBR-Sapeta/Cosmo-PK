import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class UploadPostImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @ApiProperty({ default: 'Image description.' })
  alt: string;
}
