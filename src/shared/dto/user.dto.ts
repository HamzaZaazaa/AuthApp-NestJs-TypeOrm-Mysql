import { IsStrongPassword } from "class-validator";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class userDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    Name: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    birthdate: Date

    @IsEmail()
    @IsNotEmpty()
    email: string

    // @IsStrongPassword({ minLength: 10, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    @IsNotEmpty()
    password: string
}