import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { postDto } from 'src/shared/dto/post.dto';
import { updatePosterTitleDto } from 'src/shared/dto/updatePosterTitle.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  // ADD POST
  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  createPost(
    @Param('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() postDto: postDto,
  ) {
    return this.postsService.createPost(postDto, file.filename, userId);
  }

  // Edit post Title
  @Patch('editposter/:id')
  editposterTitle(
    @Param('id') posterId: number,
    @Body() posterTitleDto: updatePosterTitleDto,
  ) {
    return this.postsService.editposterTitle(posterId, posterTitleDto);
  }

  // Delete poster
  @Delete('deletepost/:id')
  deletePoster(@Param('id') posterId: number) {
    return this.postsService.deletePoster(posterId);
  }
}
