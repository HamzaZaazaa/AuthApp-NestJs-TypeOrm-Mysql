import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { commentDto } from 'src/shared/dto/comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService
    ) { }

    // ADD A NEW COMMENT
    @Post(':userId/:postId')
    addComment(
        @Param('userId') userId: number,
        @Param('postId') postId: number,
        @Body() commentDto: commentDto
    ) {
        return this.commentsService.addComment(userId, postId, commentDto)
    }

    // UPDATE COMMENT
    @Patch('edit-comment/:commentId')
    updateComment(
        @Param('commentId') commentId: number,
        @Body() commentDto: commentDto) {
        return this.commentsService.updateComment(commentId, commentDto)
    }

    // DELETE COMMENT
    @Delete("delete-comment/:commentId")
    deleteComment(@Param('commentId') commentId: number,) {
        return this.commentsService.deleteComment(commentId)
    }

    // Get comments by post id
    @Get(':posterId')
    getComment(@Param('posterId') posterId: number) {
        return this.commentsService.getComment(posterId)
    }
}
