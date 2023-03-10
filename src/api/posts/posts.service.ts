import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { postDto } from 'src/shared/dto/post.dto';
import { updatePosterTitleDto } from 'src/shared/dto/updatePosterTitle.dto';
import { postEntity } from 'src/shared/entities/post.entity';
import { userEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(postEntity)
        private postRepo: Repository<postEntity>,
        @InjectRepository(userEntity)
        private userRepo: Repository<userEntity>
    ) { }

    // Create Post
    async createPost(postDto: postDto, file, userId: number): Promise<postEntity> {
        const userFound = await this.userRepo.findOne({ where: { id: userId } })
        if (!userFound) {
            throw BadRequestException
        }
        postDto.poster = file
        const newPost = {
            user: userFound,
            ...postDto
        }
        return this.postRepo.save(newPost)
    }

    // Edit post Title
    async editposterTitle(posterId: number, posterTitleDto: updatePosterTitleDto): Promise<postEntity> {
        const post = await this.postRepo.findOne({ where: { id: posterId } })
        if (!post) {
            throw new BadRequestException
        }
        post.posterTitle = posterTitleDto.posterTitle
        return this.postRepo.save(post)
    }

    // Delete Poster
    async deletePoster(posterId: number) {
        return await this.postRepo.delete(posterId)
    }
}
