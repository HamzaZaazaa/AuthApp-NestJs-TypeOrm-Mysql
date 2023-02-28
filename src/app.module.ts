import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from './api/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userEntity } from "./shared/entities/user.entity"
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestApp',
      entities: [
        userEntity,
      ],
      // synchronize: true,
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }