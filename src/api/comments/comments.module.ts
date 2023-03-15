import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commentEntity } from 'src/shared/entities/comment.entity';
import { postEntity } from 'src/shared/entities/post.entity';
import { userEntity } from 'src/shared/entities/user.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([commentEntity, postEntity, userEntity])
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule { }
