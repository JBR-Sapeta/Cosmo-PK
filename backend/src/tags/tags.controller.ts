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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';

import { SuccesMessage } from 'src/types';
import { Role } from 'src/types/enum';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { OPERATION, RES, HEADER } from 'src/swagger/tags';

import { TagsService } from './tags.service';
import { Tag } from './entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
@ApiTags('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get('/')
  @ApiOperation(OPERATION.getTags)
  @ApiResponse(RES.getTags.Ok)
  @ApiResponse(RES.getTags.InternalServerError)
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
  @ApiOperation(OPERATION.getTags)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.createTag.Ok)
  @ApiResponse(RES.createTag.BadRequest)
  @ApiResponse(RES.createTag.Unauthorized)
  @ApiResponse(RES.createTag.Forbidden)
  @ApiResponse(RES.createTag.Conflict)
  @ApiResponse(RES.createTag.InternalServerError)
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
  @ApiOperation(OPERATION.getTags)
  @ApiBearerAuth()
  @ApiHeader(HEADER.Authorization)
  @ApiResponse(RES.deleteTag.Ok)
  @ApiResponse(RES.deleteTag.Unauthorized)
  @ApiResponse(RES.deleteTag.Forbidden)
  @ApiResponse(RES.deleteTag.NotFound)
  @ApiResponse(RES.deleteTag.InternalServerError)
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
