import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commentEntity } from 'src/shared/entities/comment.entity';
import { postEntity } from 'src/shared/entities/post.entity';
import { userEntity } from 'src/shared/entities/user.entity';
import { AuthMiddleware } from 'src/shared/guards/auth.guard';
import { UserService } from '../user/user.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([commentEntity, postEntity, userEntity])
  ],
  controllers: [CommentsController],
  providers: [CommentsService, UserService],
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('comments');
  }
}
