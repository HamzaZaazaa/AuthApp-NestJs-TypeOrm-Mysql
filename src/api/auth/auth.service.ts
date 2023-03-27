import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { loginDto } from 'src/shared/dto/login.dto';
import { userEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { userDto } from "../../shared/dto/user.dto"
import * as bcrypt from 'bcrypt';
import { MailingService } from '../mailing/mailing.service';
import { forgetPasswordDto } from 'src/shared/dto/forgetPassword.dto';
import { JwtService } from '@nestjs/jwt';
import { passwordResetDto } from 'src/shared/dto/passwordReset.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntity)
    private userRepo: Repository<userEntity>,
    private mailingService: MailingService,
    private jwtService: JwtService
  ) { }


  // REGISTER
  async createUser(user: userDto): Promise<userEntity> {
    try {
      const addUser = this.userRepo.create(user)
      const mailObject = {
        to: addUser.email,
        from: "hamza.zaazaa01@hotmail.com",
        subject: "Account Activation Request",
      }
      this.mailingService.activateAccount(mailObject)
      return await this.userRepo.save(addUser)
    } catch (err) {
      console.log(err)
      throw new BadRequestException;
    }
  }

  // LOGIN
  async login(loginDto: loginDto): Promise<string> {
    const user = await this.userRepo.findOne({ where: { email: loginDto.email } })
    if (!user) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
    if (!await this.comparePassword(loginDto.password, user.password)) {
      throw new HttpException('Check your fields', HttpStatus.BAD_REQUEST)
    }
    const createToken = {
      id: user.id,
      Name: user.Name,
      lastName: user.lastName,
      birthdate: user.birthdate,
      email: user.email
    }
    const token = this.jwtService.sign(createToken)
    return token

  }

  // RESERT USER PASSWORD EMAIL
  async forgotPasswordEmail(passwordEmailDto: forgetPasswordDto): Promise<HttpException> {
    const user = await this.userRepo.findOne({ where: { email: passwordEmailDto.email } })
    if (!user) {
      throw new BadRequestException
    }
    const tokenObj = {
      Name: user.Name,
      email: user.email,
    }
    const token = this.jwtService.sign(tokenObj)
    const mailObject = {
      to: user.email,
      from: "hamza.zaazaa01@hotmail.com",
      subject: "Reset Password Request",
    }
    const date = new Date(); date.setDate(date.getDate() + 1)
    user.passwordTokenExpiration = date
    user.passwordToken = token
    this.userRepo.save(user)
    this.mailingService.resetPassEmail(mailObject, token).catch((err) => {
      console.log(err)
    })
    return new HttpException("Check your mail", HttpStatus.OK)
  }

  // Update Password
  async updatePassword(mypasswordToken: string, passwordDto: passwordResetDto): Promise<HttpException> {
    const user = await this.userRepo.findOne({ where: { passwordToken: mypasswordToken } })
    if (!user) {
      throw new BadRequestException
    };
    const date = new Date(Date.now())
    if (date > user.passwordTokenExpiration) {
      throw new BadRequestException
    }
    user.password = passwordDto.password
    user.passwordToken = null
    user.passwordTokenExpiration = null
    this.userRepo.save(user)
    return new HttpException("Password updated", HttpStatus.OK)
  }

  // ACCOUNT ACTIVATION
  async activateAccount(userMail: string): Promise<userEntity> {
    const user = await this.userRepo.findOne({ where: { email: userMail } })
    if (!user) {
      throw new BadRequestException
    }
    user.iSActivate = !user.iSActivate
    const ActiveUser = await this.userRepo.save(user)
    return ActiveUser
  }

  // COMPARE LOGIN PASSWORD
  public comparePassword(passOne, passTwo): Promise<boolean> {
    return bcrypt.compare(passOne, passTwo)
  }
}
