import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class mailDto {

    @IsNotEmpty()
    @MaxLength(30)
    @IsString()
    subject: string

    @IsNotEmpty()
    @IsEmail()
    from: string


    @IsNotEmpty()
    @IsString()
    to: string

    @IsNotEmpty()
    @IsString()
    content: string
}