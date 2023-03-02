import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from 'src/shared/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailingModule } from '../mailing/mailing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity]),
    JwtModule.register({
      secret: "MY_FIRST_NEST_APP",    //This should be a secret key EX : {DOTENV}
      signOptions: { expiresIn: '1d' }
    }),
    MailingModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
