import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './entity';
import { SuccesMessage } from 'src/types';
import { CreateTagDto } from './dto/create-tag.dto';
import { Role } from 'src/types/enum';
import { JwtGuard, RoleGuard } from 'src/auth/guards';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get('/')
  @UseGuards(JwtGuard)
  async getTags(): Promise<SuccesMessage & { data: Tag[] }> {
    const tags = await this.tagService.getTags();

    return {
      statusCode: 200,
      message: 'Ok.',
      error: null,
      data: tags,
    };
  }

  @Post('/')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtGuard)
  async createTag(
    @Body() createTagDto: CreateTagDto,
  ): Promise<SuccesMessage & { data: Tag }> {
    const tag = await this.tagService.createTag(createTagDto);

    return {
      statusCode: 200,
      message: 'New tag has been created.',
      error: null,
      data: tag,
    };
  }

  @Delete('/:id')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtGuard)
  async deleteTag(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<SuccesMessage & { data: Tag }> {
    const tag = await this.tagService.deleteTag(id);

    return {
      statusCode: 200,
      message: 'The tag has been deleted.',
      error: null,
      data: tag,
    };
  }
}
