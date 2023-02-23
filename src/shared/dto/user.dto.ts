import { IsStrongPassword } from "class-validator";
import { IsDate, IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator/types/decorator/decorators";


export class userDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    name: String;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    lastName: String;

    @IsDate()
    @MaxLength(8)
    @IsNotEmpty()
    birthdate: Date

    @IsEmail()
    @IsNotEmpty()
    email: String

    @IsStrongPassword({ minLength: 10, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    @IsNotEmpty()
    password: String
}