import { Controller, Get, Param, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { ENV_KEYS } from 'src/types/constant';

@Controller('files')
@ApiTags('files')
export class LocalFileController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/:subDirectory/:file')
  findProfileImage(
    @Param('subDirectory') subDirectory: string,
    @Param('file') file: string,
    @Res() res,
  ): Promise<unknown> {
    return res.sendFile(
      join(
        process.cwd(),
        this.configService.get(ENV_KEYS.UPLOADS_DIRECTORY),
        '/' + subDirectory + '/' + file,
      ),
    );
  }
}
