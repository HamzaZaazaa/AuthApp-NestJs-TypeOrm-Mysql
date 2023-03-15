import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from './api/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userEntity } from './shared/entities/user.entity';
import { MailingModule } from './api/mailing/mailing.module';
import { postEntity } from './shared/entities/post.entity';
import { PostsModule } from './api/posts/posts.module';
import { UserModule } from './api/user/user.module';
import { commentEntity } from './shared/entities/comment.entity';
import { CommentsModule } from './api/comments/comments.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestapp',
      entities: [userEntity, postEntity, commentEntity],
      synchronize: true,
    }),
    AuthModule,
    MailingModule,
    PostsModule,
    UserModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
