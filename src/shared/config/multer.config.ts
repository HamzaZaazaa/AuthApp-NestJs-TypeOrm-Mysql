import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|gif)$/)) {
    return callback(
      new HttpException('Type of file is not allowed!', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};

const filename = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|)$/)) {
    return callback(
      new HttpException('Type of file is not allowed!', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  const mydate = Date.now();
  const uniqueName = `${mydate}_${file.originalname}`;
  callback(null, uniqueName);
};

export class FileUploadService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './upload',
        filename: filename,
      }),
      limits: {
        fieldSize: 8 * 1024 * 1024,
      },
    };
  }
}
