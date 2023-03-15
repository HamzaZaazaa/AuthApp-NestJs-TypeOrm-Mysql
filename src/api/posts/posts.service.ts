import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { postDto } from 'src/shared/dto/post.dto';
import { updatePosterTitleDto } from 'src/shared/dto/updatePosterTitle.dto';
import { commentEntity } from 'src/shared/entities/comment.entity';
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

    // Create new Post
    async createPost(postDto: postDto, file: any, userId: number): Promise<postEntity> {
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

    // Edit post Title by id
    async editposterTitle(posterId: number, posterTitleDto: updatePosterTitleDto): Promise<postEntity> {
        const post = await this.postRepo.findOne({ where: { id: posterId } })
        if (!post) {
            throw new BadRequestException
        }
        post.posterTitle = posterTitleDto.posterTitle
        return this.postRepo.save(post)
    }

    // Delete Poster by id
    async deletePoster(posterId: number) {
        return await this.postRepo.delete(posterId)
    }

    // Find poster by id 
    async getPosterById(posterId: number) {
        const poster = await this.postRepo.findOne({ where: { id: posterId } })
        if (!poster) {
            throw new BadRequestException
        }
        return poster
    }

    // GET ALL USER POSTS
    async getuserPosters(userId: number): Promise<postEntity[]> {
        const posters = await this.postRepo.createQueryBuilder("post")
            .where(`post.user = ${userId}`)
            .getMany()
        return posters
    }
}
