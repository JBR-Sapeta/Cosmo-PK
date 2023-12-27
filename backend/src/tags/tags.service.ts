import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Nullable } from 'src/types';
import { PostgresErrorCode } from 'src/types/enum';

import { Tag } from './entity';
import { CreateTagDto } from './dto';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);

  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  /**
   * Asynchronously retuns all tags.
   * Throws an Error in case of failure.
   */
  async getTags(): Promise<Tag[]> {
    try {
      const tags = this.tagRepository.find();
      return tags;
    } catch (error) {
      this.logger.error(error?.message);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously retuns search for tags with given ids.
   * Throws an Error in case of failure.
   */
  async getTagsByids(ids: number[]): Promise<Tag[]> {
    try {
      const tags = this.tagRepository.find({ where: { id: In(ids) } });
      return tags;
    } catch (error) {
      this.logger.error(error?.message);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously creates new tag record in database.
   * Throws an Error in case of failure.
   */
  async createTag(tagData: CreateTagDto): Promise<Tag> {
    try {
      const tag = this.tagRepository.create(tagData);
      await this.tagRepository.save(tag);
      return tag;
    } catch (error) {
      this.logger.error(error?.message);
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('Tag name already in use.');
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Asynchronously deletes post with given id from database.
   * Throws an Error in case of failure.
   */
  async deleteTag(id: number): Promise<Tag> {
    let tag: Nullable<Tag> = null;

    try {
      tag = await this.tagRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error(error?.message);
      throw new InternalServerErrorException();
    }

    if (!tag) {
      throw new NotFoundException('Tag not found.');
    }

    try {
      await this.tagRepository.delete({ id });
      return tag;
    } catch (error) {
      this.logger.error(error?.message);
      throw new InternalServerErrorException();
    }
  }
}
