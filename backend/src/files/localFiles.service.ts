import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';

import { LocalFile } from './entity/localFile.entity';
import { LocalFileDto } from './dto/localFile.dto';
import { Nullable } from 'src/types';

@Injectable()
export class LocalFilesService {
  private readonly logger = new Logger(LocalFilesService.name);

  constructor(
    @InjectRepository(LocalFile)
    private readonly localFilesRepository: Repository<LocalFile>,
  ) {}

  /**
   * Asynchronously creates new LocalFile record in database.
   * Throws an Error in case of failure.
   */
  async saveLocalFile(fileData: LocalFileDto): Promise<LocalFile> {
    const url = '/' + fileData.path.replace(/[\\]/g, '/');
    try {
      const newFile = this.localFilesRepository.create({ ...fileData, url });
      await this.localFilesRepository.save(newFile);
      return newFile;
    } catch (error) {
      this.logger.error(error?.message);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously removes a LocalFile with given id from database and file system.
   * Throws an Error in case of failure.
   */
  async removeLocalFile(fileId: string): Promise<void> {
    let file: Nullable<LocalFile> = null;

    try {
      file = await this.localFilesRepository.findOneBy({ id: fileId });

      if (!file) {
        return;
      }

      await this.localFilesRepository.delete({ id: fileId });
    } catch (error) {
      this.logger.error(error?.message);
      throw new InternalServerErrorException();
    }

    const filePath = path.join('./', file.path);

    try {
      await fs.promises.access(filePath);
      await fs.promises.unlink(filePath);
    } catch (error) {
      this.logger.error(error?.message);
      throw new InternalServerErrorException();
    }
  }
}
