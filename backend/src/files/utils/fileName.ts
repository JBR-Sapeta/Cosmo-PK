import { v4 as uuid } from 'uuid';

export function fileName(req: any, file: Express.Multer.File, cb: any) {
  const fileType = file.mimetype.split('/');
  const extension = fileType[fileType.length - 1];
  cb(null, uuid() + '.' + extension);
}
