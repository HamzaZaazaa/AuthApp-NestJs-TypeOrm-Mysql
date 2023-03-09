import { Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file-upload')
export class FileUploadController {

    @Post()
    @UseInterceptors(FileInterceptor('poster'))
    async uploadedFile(@UploadedFile() file) {
        const response = file.filename
        return response
    }

    @Get(':imagename')
    getImage(@Param('imagename') image: string, @Res() res) {
        const response = res.sendFile(image, { root: './upload' });
        return response
    }
}
