import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { loginDto } from 'src/shared/dto/login.dto';
import { userEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { userDto } from "../../shared/dto/user.dto"
import * as bcrypt from 'bcrypt';
import { resetPasswordDto } from 'src/shared/dto/resetPassword.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntity)
    private userRepo: Repository<userEntity>,
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
  async resetPassword(userId, password): Promise<userEntity> {
    const user = await this.userRepo.findOne({ where: { id: userId } })
    console.log(user, 'USER');
    const newPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log(newPass, 'NEW PASSWORD');
    user.password = newPass
    const passUpdated = this.userRepo.save(user)
    return passUpdated
  }

  // FIND ALL USERS

  // async findAllUsers(): Promise<userEntity[]> {
  //   return await this.userRepo.find();
  // }

  // FIND USER BY ID 

  // async findOneUser(userId: number): Promise<userEntity> {
  //   try {
  //     return await this.userRepo.findOne({ where: { id: userId } });
  //   } catch (error) {
  //     console.log(error)
  //     throw new BadRequestException
  //   }
  // }

  // UPDATE USER BY ID

  // async updateUser(userId: number, userDto) {
  //   const findUser = await this.userRepo.findOne({ where: { id: userId } })
  //   findUser.Name = userDto.Name
  //   findUser.lastName = userDto.lastName
  //   findUser.birthdate = userDto.birthdate
  //   findUser.email = userDto.email
  //   findUser.password = userDto.password
  //   return this.userRepo.save(findUser)
  // }


  // DELETE USER BY ID

  // async remove(id: string) {
  //   try {
  //     return await this.userRepo.delete(id)
  //   } catch (error) {
  //     throw new BadRequestException
  //   }
  // }


  // COMPARE LOGIN PASSWORD
  public comparePassword(passOne, passTwo) {
    return bcrypt.compare(passOne, passTwo)
  }
}
