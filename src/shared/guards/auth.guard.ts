import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/api/user/user.service';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService
    ) { }

    async use(req: any, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        try {
            if (!token) {
                throw new HttpException('You are not authorized', HttpStatus.UNAUTHORIZED);
            }
            const decode: any = jwt.verify(token, 'MY_FIRST_NEST_APP')
            const user = await this.userService.getUserById(decode.id)
            if (!user) {
                throw new HttpException('You are not authorized', HttpStatus.UNAUTHORIZED);
            }
            req.user = user
            next();

        } catch (error) {
            console.log(error);
            throw new HttpException('You are not authorized', HttpStatus.UNAUTHORIZED);
        }

    }
}
