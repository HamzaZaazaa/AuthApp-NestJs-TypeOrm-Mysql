import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { updateUserDto } from 'src/shared/dto/updateUser.dto';
import { userEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(userEntity)
        private userRepo: Repository<userEntity>,
    ) { }

    // UPDATE USER
    async updateUser(userId: number, updateUserDto: updateUserDto): Promise<userEntity> {
        const user = await this.userRepo.findOne({ where: { id: userId } })
        if (!user) {
            throw new BadRequestException
        }
        user.Name = updateUserDto.Name
        user.lastName = updateUserDto.lastName
        user.birthdate = updateUserDto.birthdate
        return this.userRepo.save(user)
    }
    // Get user by id
    async getUserById(userId: number): Promise<userEntity> {
        const user = await this.userRepo.findOne({ where: { id: userId } })
        return user
    }

    // Delete user
    async deleteUser(userId: number) {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['post', 'comment'] })
        return await this.userRepo.remove(user)
    }
}
