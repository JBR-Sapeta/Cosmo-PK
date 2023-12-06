import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

class AvatarUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}

export default AvatarUploadDto;
