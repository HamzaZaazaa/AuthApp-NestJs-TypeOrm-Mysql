import { HttpException, HttpStatus } from '@nestjs/common';



export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|gif)$/)) {
        return callback(
            new HttpException('Type of file is not allowed!', HttpStatus.BAD_REQUEST),
            false
        );
    }
    callback(null, true);
};

export const filename = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|)$/)) {
        return callback(
            new HttpException('Type of file is not allowed!', HttpStatus.BAD_REQUEST),
            false
        );
    }
    callback(null, file.originalname);
};