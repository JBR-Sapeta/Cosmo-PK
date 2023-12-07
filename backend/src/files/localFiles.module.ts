import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocalFilesService } from './localFiles.service';
import { LocalFile } from './entity/localFile.entity';
import { LocalFileController } from './localFiles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile])],
  controllers: [LocalFileController],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
})
export class LocalFileModule {}
