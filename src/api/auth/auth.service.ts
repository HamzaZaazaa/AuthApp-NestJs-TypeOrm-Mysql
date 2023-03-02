import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { loginDto } from 'src/shared/dto/login.dto';
import { userEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { userDto } from "../../shared/dto/user.dto"
import * as bcrypt from 'bcrypt';
import { MailingService } from '../mailing/mailing.service';
import { resetPasswordDto } from 'src/shared/dto/resetPassword.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntity)
    private userRepo: Repository<userEntity>,
    private mailingService: MailingService,
    private jwtService: JwtService
  ) { }


  // CREATE USER
  async createUser(user: userDto): Promise<userEntity> {
    try {
      const addUser = this.userRepo.create(user)
      return await this.userRepo.save(addUser)
    } catch (err) {
      console.log(err)
      throw new BadRequestException;
    }
  }

  // LOGIN
  async login(loginDto: loginDto): Promise<userEntity> {
    return this.userRepo.findOne({
      where: {
        email: loginDto.email
      }
    })
  }

  // RESERT USER PASSWORD
  async resetPassword(emailDto: resetPasswordDto) {
    const user = await this.userRepo.findOne({ where: { email: emailDto.email } })
    const tokenObj = {
      Name: user.Name,
      email: user.email,
      exp: user.passwordTokenExpiration
    }
    const token = this.jwtService.sign(tokenObj)
    const mailObject = {
      to: user.email,
      from: "hamza.zaazaa@nest.com",
      subject: "Reset Password Request",
    }
    const date = new Date(); date.setDate(date.getDate() + 1)
    user.passwordTokenExpiration = date
    user.passwordToken = token
    this.userRepo.save(user)
    this.mailingService.resetPassEmail(mailObject, token).catch((err) => {
      console.log(err)
    })
    return new HttpException("", HttpStatus.ACCEPTED)
  }


  // COMPARE LOGIN PASSWORD
  public comparePassword(passOne, passTwo) {
    return bcrypt.compare(passOne, passTwo)
  }
}
