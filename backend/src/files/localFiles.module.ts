import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocalFilesService } from './localFiles.service';
import { LocalFile } from './entity/localFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile])],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
})
export class LocalFileModule {}
