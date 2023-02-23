import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { userDto } from "../../shared/dto/user.dto"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntity)
    private userRepo: Repository<userEntity>,
  ) { }


  // CREATE USER
  async create(user: userDto): Promise<userEntity> {
    try {
      return await this.userRepo.save(user)
    } catch {
      throw new BadRequestException;
    }

  }
  // FIND ALL USERS
  async findAll(): Promise<userEntity[]> {
    return await this.userRepo.find();
  }

  // FIND USER BY ID 
  async findOne(userId: number): Promise<userEntity> {
    try {
      return await this.userRepo.findOne({ where: { id: userId } });
    } catch (error) {
      throw new BadRequestException
    }
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
