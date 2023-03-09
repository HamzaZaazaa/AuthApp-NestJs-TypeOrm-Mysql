import { IsNotEmpty, MaxLength } from "class-validator"


export class passwordResetDto {

    @IsNotEmpty()
    @MaxLength(15)
    password: string
}