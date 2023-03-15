import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commentDto } from 'src/shared/dto/comment.dto';
import { commentEntity } from 'src/shared/entities/comment.entity';
import { postEntity } from 'src/shared/entities/post.entity';
import { userEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(commentEntity)
        private commentRepo: Repository<commentEntity>,
        @InjectRepository(userEntity)
        private userRepo: Repository<userEntity>,
        @InjectRepository(postEntity)
        private postRepo: Repository<postEntity>
    ) { }

    // Add A NEW COMMENT
    async addComment(userId: number, postId: number, commentDto: commentDto): Promise<commentEntity> {
        const user = await this.userRepo.findOne({ where: { id: userId } })
        const poster = await this.postRepo.findOne({ where: { id: postId } })
        if (!user || !poster) {
            throw new BadRequestException
        }
        const newComment = {
            user: user,
            post: poster,
            ...commentDto
        }
        return this.commentRepo.save(newComment)
    }

    // UPDATE COMMENT
    async updateComment(commentId: number, commentDto: commentDto): Promise<commentEntity> {
        const myComment = await this.commentRepo.findOne({ where: { id: commentId } })
        if (!myComment) {
            throw new BadRequestException
        }
        myComment.comment = commentDto.comment
        return this.commentRepo.save(myComment)
    }

    // DELETE COMMENT
    async deleteComment(commentId: number): Promise<HttpException> {
        await this.commentRepo.delete(commentId)
        return new HttpException('Comment Deleted', HttpStatus.OK)
    }

    // GET COMMENTS
    async getComment(posterId: number): Promise<commentEntity[]> {
        const poster = this.commentRepo.createQueryBuilder('comment')
            .where(`comment.post = ${posterId}`)
            .getMany()
        return poster
    }
}
