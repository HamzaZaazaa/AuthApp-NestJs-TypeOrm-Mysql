import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class postDto {


    @IsString()
    poster: string

    @IsNotEmpty()
    @IsString()
    // @MaxLength(10)
    posterTitle: string


}