import { Controller, Post, Body, BadRequestException, HttpException, HttpStatus, Param } from '@nestjs/common';
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
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      }
      if (!this.authService.comparePassword(user.password, loginDto.password)) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
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

  // TOKEN VERIFICATION 
  @Post('token')
  verifyToken(@Body() token: any) {
    try {
      const myToken = this.jwtService.verify(token.token);
      throw new HttpException("Verified", HttpStatus.ACCEPTED)
    } catch (err) {
      console.log(err)
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  // RESERT USER PASSWORD
  @Post('resetpassword/:id')
  resetPassword(@Param('id') userId: string, @Body() resetPasswordDto: resetPasswordDto) {
    this.authService.resetPassword(userId, resetPasswordDto.password).then((user) => {
      user.password = ""
      return this.jwtService.sign(user)
    }).catch((err) => {
      console.log(err);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    })
  }

  // GET ALL USERS

  // @Get()
  // findAllUsers() {
  //   return this.authService.findAllUsers();
  // }

  // GET USER BY ID

  // @Get(':id')
  // findOneUser(@Param('id') id: number) {
  //   return this.authService.findOneUser(id);
  // }

  // UPDATE USER BY ID

  // @Patch(':id')
  // updateUser(@Param('id') id: string, @Body() userDto: userDto) {
  //   return this.authService.updateUser(+id, userDto);
  // }


  // DELETE USER BY ID 

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(id);
  // }
}
