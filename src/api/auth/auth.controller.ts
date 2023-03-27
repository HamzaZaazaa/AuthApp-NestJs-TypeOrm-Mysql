import { Controller, Post, Body, Patch, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto } from '../../shared/dto/user.dto'
import { loginDto } from 'src/shared/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { forgetPasswordDto } from 'src/shared/dto/forgetPassword.dto';
import { passwordResetDto } from 'src/shared/dto/passwordReset.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService

  ) { }

  // REGISTER
  @Post()
  createUser(@Body() userDto: userDto) {
    return this.authService.createUser(userDto);
  }


  // LOGIN
  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto)
  }

  // RESET PASSWORD EMAIL
  @Post('reset-password')
  forgotPasswordEmail(@Body() passwordEmailDto: forgetPasswordDto) {
    return this.authService.forgotPasswordEmail(passwordEmailDto)
  }

  // change password
  @Post("change-password/:passwordToken")
  updatePassword(@Param('passwordToken') mypasswordToken: string, @Body() passwordDto: passwordResetDto) {
    return this.authService.updatePassword(mypasswordToken, passwordDto)
  };

  // Account Activation
  @Patch(":userMail/account-activation")
  activateAccount(@Param('userMail') userMail: string) {
    return this.authService.activateAccount(userMail)
  }
}
