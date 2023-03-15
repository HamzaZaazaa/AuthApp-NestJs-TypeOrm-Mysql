import { IsNotEmpty, IsString } from "class-validator";



export class updateUserDto {

    @IsString()
    @IsNotEmpty()
    Name: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    birthdate: Date
}