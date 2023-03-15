import {
  Body,
  Controller,
  Delete,
  Get,
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
  constructor(private postsService: PostsService) { }


  // ADD NEW POST
  @Post(':userId')
  @UseInterceptors(FileInterceptor('poster'))
  createPost(
    @Param('userId') userId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() postDto: postDto,
  ) {
    return this.postsService.createPost(postDto, file.filename, userId);
  }

  // Edit post Title by id
  @Patch('editposter/:posterId')
  editposterTitle(
    @Param('posterId') posterId: number,
    @Body() posterTitleDto: updatePosterTitleDto,
  ) {
    return this.postsService.editposterTitle(posterId, posterTitleDto);
  }

  // Delete poster by id
  @Delete('deletepost/:posterId')
  deletePoster(@Param('posterId') posterId: number) {
    return this.postsService.deletePoster(posterId);
  }

  // FIND POSTER BY ID
  @Get("onepost/:posterId")
  getPosterById(@Param('posterId') posterId: number) {
    return this.postsService.getPosterById(posterId)
  }

  // GET ALL USER POSTERS
  @Get('posters/:userId')
  getuserPosters(@Param("userId") userId: number) {
    return this.postsService.getuserPosters(userId)
  }
}
