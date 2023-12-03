import { BadRequestException } from '@nestjs/common';

export function fileFilter(
  request: Express.Request,
  file: Express.Multer.File,
  callback,
): string {
  if (!file.mimetype.includes('image')) {
    return callback(
      new BadRequestException({
        statusCode: 400,
        message: { file: 'Provide a valid image' },
        error: 'Bad Request',
      }),
      false,
    );
  }

  if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
    return callback(
      new BadRequestException({
        statusCode: 400,
        message: { file: 'Only jpg,jpeg and png files are supported.' },
        error: 'Bad Request',
      }),
      false,
    );
  }

  callback(null, true);
}
