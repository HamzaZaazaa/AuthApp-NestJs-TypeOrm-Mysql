import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class commentDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    comment: string
}