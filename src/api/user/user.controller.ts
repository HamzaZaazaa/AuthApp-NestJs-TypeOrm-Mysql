import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { updateUserDto } from 'src/shared/dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    // Update user
    @Patch('update/:id')
    updateUser(@Param('id') userId: number, @Body() updateUserDto: updateUserDto) {
        return this.userService.updateUser(userId, updateUserDto)
    }

    // Delete user
    @Delete("delete-user/:userid")
    deleteUser(@Param('userid') userId: number) {
        return this.userService.deleteUser(userId)
    }
}
