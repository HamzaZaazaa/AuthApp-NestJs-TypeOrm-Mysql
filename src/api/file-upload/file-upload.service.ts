import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename, imageFileFilter } from 'src/shared/config/multer.config';

@Injectable()
export class FileUploadService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            fileFilter: imageFileFilter,
            storage: diskStorage({
                destination: './upload',
                filename: filename,
            }), limits: {
                fieldSize: 8 * 1024 * 1024
            }
        }
    }
}
