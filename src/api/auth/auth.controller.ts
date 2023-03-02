import { Controller, Post, Body, Get, BadRequestException, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto } from '../../shared/dto/user.dto'
import { loginDto } from 'src/shared/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { resetPasswordDto } from 'src/shared/dto/resetPassword.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService

  ) { }

  // ADD USER
  @Post()
  createUser(@Body() userDto: userDto) {
    return this.authService.createUser(userDto);
  }
  // LOGIN
  @Post('login')
  login(@Body() loginDto: loginDto) {
    this.authService.login(loginDto).then((user) => {
      if (!user) {
        throw new HttpException('', HttpStatus.BAD_REQUEST)
      }
      if (!this.authService.comparePassword(user.password, loginDto.password)) {
        throw new HttpException('', HttpStatus.BAD_REQUEST)
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

    }).catch((err) => {
      console.log(err)
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR)
    })
  }


  @Post('reset-password')
  resetPassword(@Body() emailDto: resetPasswordDto): Promise<HttpException> {
    return this.authService.resetPassword(emailDto)
  }
}
